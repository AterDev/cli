using Entity.CMSMod;
using Entity.CustomerMod;
using Entity.FileManagerMod;
using Entity.OrderMod;
using Entity.SystemMod;

namespace EntityFramework.DBProvider;
public partial class ContextBase
{
    public DbSet<SystemUser> SystemUsers { get; set; }
    public DbSet<SystemRole> SystemRoles { get; set; }
    public DbSet<SystemConfig> SystemConfigs { get; set; }
    /// <summary>
    /// 菜单
    /// </summary>
    public DbSet<SystemMenu> SystemMenus { get; set; }
    public DbSet<SystemPermission> SystemPermissions { get; set; }
    /// <summary>
    /// 权限组
    /// </summary>
    public DbSet<SystemPermissionGroup> SystemPermissionGroups { get; set; }
    public DbSet<SystemLogs> SystemLogs { get; set; }
    public DbSet<SystemOrganization> SystemOrganizations { get; set; }
    public DbSet<FileData> FileDatas { get; set; }
    public DbSet<Folder> Folders { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Catalog> Catalogs { get; set; }


    public DbSet<CustomerInfo> CustomerInfos { get; set; }
    public DbSet<CustomerRegister> CustomerRegisters { get; set; }

}
