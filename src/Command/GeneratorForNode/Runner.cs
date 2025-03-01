﻿using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;

namespace GeneratorForNode;
public class Runner
{
    /// <summary>
    /// swagger文档链接
    /// </summary>
    public string DocUrl { get; set; }
    /// <summary>
    /// 文档名称 swagger/{documentName}/swagger.json
    /// </summary>
    public string DocName { get; set; }

    public OpenApiDocument? ApiDocument { get; set; }

    public RequestLibType LibType { get; set; } = RequestLibType.NgHttp;

    public string OutputPath { get; set; }
    public Runner(string docUrl, string output, RequestLibType libType)
    {
        DocUrl = docUrl;
        OutputPath = output;
        LibType = libType;

        DocName = docUrl.Contains("http") ? docUrl.Split('/').Reverse().Skip(1).First() : string.Empty;
    }

    public async Task ParseOpenApiAsync()
    {
        string openApiContent = "";
        if (DocUrl.StartsWith("http://") || DocUrl.StartsWith("https://"))
        {
            HttpClientHandler handler = new()
            {
                ServerCertificateCustomValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true
            };

            using HttpClient http = new(handler);

            openApiContent = await http.GetStringAsync(DocUrl);
        }
        else
        {
            openApiContent = File.ReadAllText(DocUrl);
        }
        openApiContent = openApiContent
            .Replace("«", "")
            .Replace("»", "");
        ApiDocument = new OpenApiStringReader()
            .Read(openApiContent, out _);

        await GenerateCommonFilesAsync();
        await GenerateRequestServicesAsync();
        Console.WriteLine("😀 Request services generate completed!" + Environment.NewLine);
    }

    public async Task GenerateCommonFilesAsync()
    {
        string content = RequestGenerate.GetBaseService(LibType);
        string dir = Path.Combine(OutputPath, "services", DocName);
        await GenerateFileAsync(dir, "base.service.ts", content, false);

        // 枚举pipe
        if (LibType == RequestLibType.NgHttp)
        {
            IDictionary<string, OpenApiSchema> schemas = ApiDocument!.Components.Schemas;
            string pipeContent = RequestGenerate.GetEnumPipeContent(schemas);
            dir = Path.Combine(OutputPath, "pipe", DocName);
            await GenerateFileAsync(dir, "enum-text.pipe.ts", pipeContent, true);
        }
    }

    public async Task GenerateRequestServicesAsync()
    {
        RequestGenerate ngGen = new(ApiDocument!)
        {
            LibType = LibType
        };

        // 获取对应的ts模型类，生成文件
        List<GenFileInfo> models = ngGen.GetTSInterfaces();
        foreach (GenFileInfo model in models)
        {

            string dir = Path.Combine(OutputPath, "services", DocName, model.Path, "models");
            await GenerateFileAsync(dir, model.Name, model.Content, true);
        }

        // 获取请求服务并生成文件
        List<GenFileInfo> services = ngGen.GetServices(ApiDocument!.Tags);
        foreach (GenFileInfo service in services)
        {
            string dir = Path.Combine(OutputPath, "services", DocName, service.Path);
            await GenerateFileAsync(dir, service.Name, service.Content, !service.CanModify);
        }
    }

    public async Task GenerateFileAsync(string dir, string fileName, string content, bool cover = false)
    {
        if (!Directory.Exists(dir))
        {
            _ = Directory.CreateDirectory(dir);
        }
        string filePath = Path.Combine(dir, fileName);
        if (!File.Exists(filePath) || cover)
        {
            try
            {
                await File.WriteAllTextAsync(filePath, content, new UTF8Encoding(false));
                Console.WriteLine(@$"  ℹ️ generate file {fileName}.");
            }
            catch (IOException ex)
            {
                Console.WriteLine($"写入文件失败：{ex.Message}");
            }

        }
        else
        {
            Console.WriteLine($"  🦘 Skip exist file: {fileName}.");
        }
    }
}
