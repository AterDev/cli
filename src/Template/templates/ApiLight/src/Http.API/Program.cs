using Http.API;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// 1 添加默认组件
builder.AddDefaultComponents();
// 2 注册和配置Web服务依赖
builder.AddDefaultWebServices();
// 3 其他自定义选项及服务

WebApplication app = builder.Build();

// 使用中间件
app.UseDefaultWebServices();
app.Run();

public partial class Program { }