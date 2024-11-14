using Microsoft.AspNetCore.Mvc.Testing;

namespace Application.Test;

public class BaseTest : IClassFixture<WebApplicationFactory<Program>>
{
    protected readonly IServiceProvider Services;
    public BaseTest(WebApplicationFactory<Program> factory)
    {
        factory = factory.WithWebHostBuilder(builder =>
          {
              builder.ConfigureServices(services =>
              {
                  // your test database
                  //var connectionString = "";
                  //services.AddDbContextPool<QueryDbContext>(option => option.UseNpgsql(connectionString));
                  //services.AddDbContextPool<CommandDbContext>(option => option.UseNpgsql(connectionString));
              });
          });
        Services = factory.Services.CreateScope().ServiceProvider;
    }
}
