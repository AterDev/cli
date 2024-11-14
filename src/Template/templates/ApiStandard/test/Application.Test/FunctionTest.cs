using Microsoft.AspNetCore.Mvc.Testing;

namespace Application.Test;
/// <summary>
/// 方法测试
/// </summary>
public class FunctionTest : BaseTest
{
    private readonly IConfiguration configuration;
    public FunctionTest(WebApplicationFactory<Program> factory) : base(factory)
    {
        configuration = Services.GetRequiredService<IConfiguration>();
    }
}
