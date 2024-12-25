using Microsoft.AspNetCore.Http;

namespace Application;
public interface IUserContext : IUserContextBase
{
    HttpContext? GetHttpContext();
}
