using EntityFramework.DBProvider;

using Microsoft.AspNetCore.Mvc.Testing;

namespace Application.Test;
/// <summary>
/// 初始化测试数据
/// </summary>
public class InitDataTest : BaseTest
{
    private readonly IConfiguration configuration;
    private readonly CommandDbContext _context;
    public InitDataTest(WebApplicationFactory<Program> factory) : base(factory)
    {
        configuration = Services.GetRequiredService<IConfiguration>();
        _context = Services.GetRequiredService<CommandDbContext>();
    }
}
