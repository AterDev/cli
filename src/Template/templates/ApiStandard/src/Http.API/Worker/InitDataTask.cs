using EntityFramework.DBProvider;

namespace Http.API.Worker;
public class InitDataTask
{
    /// <summary>
    /// 初始化应用数据
    /// </summary>
    /// <param name="provider"></param>
    /// <returns></returns>
    public static async Task InitDataAsync(IServiceProvider provider)
    {
        CommandDbContext context = provider.GetRequiredService<CommandDbContext>();
        ILoggerFactory loggerFactory = provider.GetRequiredService<ILoggerFactory>();
        ILogger<InitDataTask> logger = loggerFactory.CreateLogger<InitDataTask>();
        IConfiguration configuration = provider.GetRequiredService<IConfiguration>();

        var connectionString = context.Database.GetConnectionString();
        try
        {
            // 执行迁移,如果手动执行,请删除该代码
            context.Database.Migrate();
            if (!await context.Database.CanConnectAsync())
            {
                logger.LogError("数据库无法连接:{message}", connectionString);
                return;
            }
            else
            {
                // 初始化用户
                var user = await context.Users.FirstOrDefaultAsync();
                if (user == null)
                {
                    await InitUserAsync(context, configuration, logger);
                }
                //await SystemMod.InitModule.InitializeAsync(provider);
                // [InitModule]
            }
        }
        catch (Exception)
        {
            logger.LogError("初始化异常,请检查数据库配置并确认已经进行【迁移操作】");
        }
    }

    /// <summary>
    /// 初始化角色
    /// </summary>
    public static async Task InitUserAsync(CommandDbContext context, IConfiguration configuration, ILogger<InitDataTask> logger)
    {
        var defaultPassword = configuration.GetValue<string>("Key:DefaultPassword");
        if (string.IsNullOrWhiteSpace(defaultPassword))
        {
            defaultPassword = "Hello.Net";
        }
        var salt = HashCrypto.BuildSalt();

        User user = new()
        {
            UserName = "TestUser",
            Email = "TestEmail@domain",
            PasswordSalt = salt,
            PasswordHash = HashCrypto.GeneratePwd(defaultPassword, salt),
        };

        try
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();
            logger.LogInformation("初始化用户数据成功:{username}/{password}", user.UserName, defaultPassword);

        }
        catch (Exception ex)
        {
            logger.LogError("初始化角色用户时出错,请确认您的数据库没有数据！{message}", ex.Message);
        }
    }

}
