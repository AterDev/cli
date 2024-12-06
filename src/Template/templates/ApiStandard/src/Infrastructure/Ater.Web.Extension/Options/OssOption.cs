using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ater.Web.Extension.Options;
public class OssOption
{
    public const string SectionName = "Oss";
    public required string Endpoint { get; set; }
    public required string AccessId { get; set; }
    public required string AccessKey { get; set; }
    public string BucketName { get; set; } = string.Empty;
}
