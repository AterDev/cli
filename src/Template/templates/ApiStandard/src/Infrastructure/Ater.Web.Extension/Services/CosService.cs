using Ater.Web.Extension.Options;
using COSXML;
using COSXML.Auth;
using COSXML.Model.Bucket;
using COSXML.Model.Object;
using COSXML.Model.Tag;
using Microsoft.Extensions.Options;

namespace Ater.Web.Extension.Services;
/// <summary>
/// 存储服务
/// </summary>
public class CosService
{
    private readonly CosOption _options;
    private readonly ILogger<CosService> _logger;
    private readonly CosXmlServer _client;

    public CosService(ILogger<CosService> logger, IOptions<CosOption> qCloudOption)
    {
        _options = qCloudOption.Value;
        _logger = logger;

        CosXmlConfig config = new CosXmlConfig.Builder()
          .SetRegion("ap-shanghai")
          .Build();

        long durationSecond = 600;
        var qCloudCredentialProvider = new DefaultQCloudCredentialProvider(_options.SecretId,
          _options.SecretKey, durationSecond);
        _client = new CosXmlServer(config, qCloudCredentialProvider);
    }


    /// <summary>
    /// 上传到腾讯对象存储
    /// </summary>
    /// <param name="stream"></param>
    /// <param name="filePath"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException"></exception>
    public string? UploadToCOS(Stream stream, string filePath)
    {
        filePath = filePath.Replace("\\", "/");
        var request = new PutObjectRequest(_options.BucketName, filePath, stream);
        //设置进度回调
        request.SetCosProgressCallback(delegate (long completed, long total)
        {
            // 进度
            //Console.WriteLine(string.Format("progress = {0:##.##}%", completed * 100.0 / total));
        });
        PutObjectResult result = _client.PutObject(request);
        //关闭文件流
        stream.Close();

        if (result.IsSuccessful())
        {
            return result.Key;
        }
        else
        {
            _logger.LogError("上传到腾讯对象存储失败:{code},{message}", result.httpCode, result.httpMessage);
            return null;
        }
    }

    /// <summary>
    /// 列出文件
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public List<ListBucket.Contents> GetFiles(string path)
    {
        var request = new GetBucketRequest(_options.BucketName);
        request.SetPrefix(path);
        request.SetDelimiter("/");
        var result = _client.GetBucket(request);
        if (result.IsSuccessful())
        {
            return result.listBucket.contentsList;
        }
        else
        {
            _logger.LogError("获取文件列表失败:{code},{message}", result.httpCode, result.httpMessage);
            return [];
        }
    }

    /// <summary>
    /// 返回可访问地址
    /// </summary>
    /// <param name="path"></param>
    /// <param name="useCdn"></param>
    /// <returns></returns>
    public string GetAccessUrl(string path, bool useCdn = true)
    {
        path = path.Replace("\\", "/");
        var preSignatureStruct = new PreSignatureStruct
        {
            appid = _options.AppId,
            region = "ap-shanghai",
            bucket = _options.BucketName,
            key = path,
            httpMethod = "GET",
            signDurationSecond = 20,
        };
        if (useCdn)
        {
            preSignatureStruct.host = _options.Cdn;
        }

        return _client.GenerateSignURL(preSignatureStruct);
    }

    /// <summary>
    /// 是否存在
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    public bool Exist(string path)
    {
        path = path.Replace("\\", "/");
        var request = new HeadObjectRequest(_options.BucketName, path);
        HeadObjectResult result = _client.HeadObject(request);

        if (result.IsSuccessful())
        {
            return true;
        }

        return false;
    }

    /// <summary>
    /// 删除文件
    /// </summary>
    /// <param name="filePath"></param>
    public void DeleteFile(string filePath)
    {
        var request = new DeleteObjectRequest(_options.BucketName, filePath);
        var result = _client.DeleteObject(request);
        if (!result.IsSuccessful())
        {
            _logger.LogError("删除文件失败:{code},{message}", result.httpCode, result.httpMessage);
        }
        else
        {
            _logger.LogInformation("已清理音频文件:{filePath}", filePath);
        }
    }

    private void ValidatorQCloudOptions()
    {
        if (_options.SecretId == null || _options.SecretKey == null)
        {
            throw new ArgumentNullException(nameof(_options.SecretId));
        }
        if (_options.BucketName == null)
        {
            throw new ArgumentNullException(nameof(_options.BucketName));
        }
    }

}
