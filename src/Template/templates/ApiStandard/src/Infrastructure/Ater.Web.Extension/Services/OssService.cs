using System.Net;
using Aliyun.OSS;
using Ater.Web.Extension.Options;
using Microsoft.Extensions.Options;
namespace Ater.Web.Extension.Services;

public class OssService
{
    private readonly OssOption _option;
    private readonly OssClient _client;
    private readonly ILogger<OssService> _logger;
    public string BucketName { get; private set; }

    public OssService(IOptionsMonitor<OssOption> monitor, ILogger<OssService> logger)
    {
        _logger = logger;
        _option = monitor.CurrentValue;
        _client = new OssClient(_option.Endpoint, _option.AccessId, _option.AccessKey);
        BucketName = _option.BucketName;
    }

    public void SetBucketName(string bucketName)
    {
        BucketName = bucketName;
    }

    public string GetRealUrl(string path, string? bucketName = null)
    {
        var uri = _client.GeneratePresignedUri(bucketName ?? BucketName, path, DateTime.Now.AddMinutes(30));
        return uri.AbsoluteUri;
    }

    public string GetRealUrl(string path, string fileName, string? bucketName = null)
    {
        GeneratePresignedUriRequest request = new GeneratePresignedUriRequest(bucketName ?? BucketName, path)
        {
            Expiration = DateTime.Now.AddMinutes(30),
            ResponseHeaders = new ResponseHeaderOverrides()
            {
                ContentDisposition = "attachment;filename=\"" + WebUtility.UrlEncode(fileName) + "\""
            }
        };
        var uri = _client.GeneratePresignedUri(request);
        return uri.AbsoluteUri;
    }

    public List<OssObjectSummary> ListObjects(string? bucketName = null)
    {
        var result = _client.ListObjects(bucketName ?? BucketName);
        return result.ObjectSummaries.ToList();
    }

    public bool UploadStream(string ossFileFullName, Stream stream, CancellationToken? token = null)
    {
        try
        {
            token?.ThrowIfCancellationRequested();
            var res = UploadStreamThrowable(ossFileFullName, stream, null);
            return res.HttpStatusCode == HttpStatusCode.OK;

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "UploadStreamThrowable Error");
            return false;
        }

    }

    /// <summary>
    /// 简单上传模式 - Stream
    /// </summary>
    /// <param name="ossFileFullName">Oss 文件，完整名，包含目录和文件名</param>
    /// <param name="stream">Stream</param>
    /// <param name="metadata"></param>
    /// <returns></returns>
    public PutObjectResult UploadStreamThrowable(string ossFileFullName, Stream stream, ObjectMetadata? metadata)
    {
        if (metadata != null)
        {
            return _client.PutObject(BucketName, ossFileFullName, stream, metadata);
        }
        else
        {
            return _client.PutObject(BucketName, ossFileFullName, stream);
        }
    }
}
