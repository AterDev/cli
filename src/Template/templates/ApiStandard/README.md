# 说明

`ater.web.template` 项目模板的使用提供文档支持。

## 根目录

- docs: 项目文档存储目录
- scripts： 项目脚本文件目录
- src：项目代码目录
- test：测试项目目录
- runtime：基于`.NETAspire`的开发环境集成
- .config：配置文件目录
- .dry-config.json 项目配置信息，当使用`dry cli`时需要该文件。

## 代码目录src

- Infrastructure 框架的基础定义，通常不需要关心，也不应该修改。
- Definition 定义层，先定义后实施，该目录主要是定义实体和DTO，以及ORM关系等。
  - Entity 基础核心类库，**`实体模型`** 定义所在项目，包括基础库的扩展，辅助类等。
  - Share 共享类库，**`DTO`** 定义所在项目，可在多个应用间共用的内容，如各类模型定义、通用配置、数据处理转换等，依赖 `Entity`。
  - EntityFramework `Entity Framework` 定义项目，依赖`Entity`。
- Application **`Manager`** 业务实现所在项目，包括各类服务。依赖 `Share`,`EntityFramework`。
- Http.API **`WebAPI`** 接口项目，定义和实现控制器逻辑，对外开放和运行的主程序，依赖`Application`。
- Microservice 拆分可单独部署的应用，如微服务项目，通常依赖`Application`项目，以复用相关逻辑代码。
- Modules 模块目录。不同于拆分成单独的服务，模块的作用主要是实现关注点分离，它仍属于主服务的一部分。模块通常包括：
  - Models 接口所需要的DTO模型
  - Manager 该模块的业务实现逻辑
  - Controller 该模块定义或公开的接口

> [!NOTE]
> 这里不存在基于`模块`的开发，也没有这个概念。这里的模块是基于业务上的划分，将相应的业务实现在代码上进行拆分，实现关注点分离。
>
> 模块拥有自己的业务实现逻辑和API接口定义。它引用`Application`项目，以实现业务逻辑复用，并被`Http.API`主项目引用，统一公开接口访问。
>
> 模块的实体模型仍然在 Entity 项目中进行定义和管理

# 开始使用

## 数据库配置

模板默认使用`PostgreSQL`，如果您使用其他数据库，你需要进行的操作：

- 修改`appsettings.json`等配置文件中的**数据库连接字符串**
- 在`Application`项目中添加相应的数据库驱动包
- 在`Http.API`项目`Program.cs`中，修改数据库上下文的注入。

## 数据迁移

移除了`EntityFramework.Migrator`，迁移代码将直接生成在`Http.API`项目中。
可直接运行`scripts\EFMigrations.ps1`脚本生成迁移内容，程序在启动时会执行迁移。

## 运行项目

```pwsh
cd src\Http.API
dotnet watch run 
```

默认会创建`TestUser/Hello.Net`初始用户账号。

# 规范及约定

## EF模型定义

遵循`Entity Framework Core`的官方文档，对模型及关联关系进行定义。

通过`dotnet ef`命令进行数据库结构的迁移。

## CQRS仓储模式

模板提供了两个默认实现的仓储基类`CommandSet`和`QuerySet`，在`Ater.Web.Abstraction`项目的`EntityFramework`目录中.分别代表命令(可读写)仓储和查询仓储(只读仓储)。

## 业务Manager

通过`Manager`来定义和管理业务方法，模板中提供`ManagerBase`类作为默认实现。

通过`dry`命令会根据您的实体模型，自动生成对应的业务实现类。在生成的业务实现类中，你可以自由实现自己的业务逻辑。

>使用`dry`生成会自动注入业务实现服务，无需手动注入。

## 接口请求与返回

整体以RESTful风格为标准，进行一定的简化。

### 请求方式

- GET，获取数据时使用GET，复杂的筛选和条件查询，可改用POST方式传递参数。
- POST，添加数据时使用POST。主体参数使用JSON格式。
- PUT，修改数据时使用PUT。主体参数使用JSON格式。
- DELETE，删除数据时使用DELETE。

### 请求返回

返回以HTTP状态码为准。

- 200，执行成功。
- 201，创建成功。
- 401，未验证，没有传递token或token已失效。需要重新获取token(登录)。
- 403，禁止访问，指已登录的用户但没有权限访问。
- 404，请求的资源不存在。
- 409，资源冲突。
- 500，错误返回，服务器出错或业务错误封装。

接口请求成功时， 前端可直接获取数据。

接口请求失败时，返回统一的错误格式。

前端根据HTTP状态码判断请求是否成功，然后获取数据。

错误返回的格式如下：

```json
{
  "title": "",
  "status": 500,
  "detail": "未知的错误！",
  "traceId": "00-d768e1472decd92538cdf0a2120c6a31-a9d7310446ea4a3f-00"
}
```

### ASP.NET Core 请求返回示例

1. 路由定义，约定使用HTTP谓词，不使用Route。
请参见 [**HTTP谓词模板**](https://docs.microsoft.com/zh-cn/aspnet/core/mvc/controllers/routing?view=aspnetcore-6.0#http-verb-templates)。
2. **模型绑定**，可使用`[Frombody]`以及`[FromRoute]`指明请求来源，
参见[**请求来源**](https://docs.microsoft.com/zh-cn/aspnet/core/mvc/models/model-binding?view=aspnetcore-6.0#sources)，如：

```csharp
// 修改信息
[HttpPut("{id}")]
public async Task<ActionResult<TEntity?>> UpdateAsync([FromRoute] Guid id, TUpdate form)
```

1. 关于返回类型，请使用[ActionResult&#60;T&#62;或特定类型](https://docs.microsoft.com/zh-cn/aspnet/core/web-api/action-return-types?view=aspnetcore-6.0#actionresult-vs-iactionresult)作为返回类型。

- 正常返回，可直接返回特定类型数据。
- 错误返回,使用Problem()，如：

```csharp
// 如果错误，使用Problem返回内容
return Problem("未知的错误！", title: "业务错误");
```

- 404，使用NotFound()，如：

```csharp
// 如果不存在，返回404
return NotFound("用户名密码不存在");
```

# 业务实现

## 定义实体模型

遵循`Entity Framework Core`的官方文档，对模型及关联关系进行定义。

## 生成基础代码

使用`dry api`生成基础的`DTO`,`Manager`,`Controller`等基础代码。

## 实现自定义业务逻辑
>
> 默认的`Manager`继承了`ManagerBase`类，实现了常见的业务逻辑。
默认实现的新增和修改，会直接调用`SaveChangesAsync()`，提交数据库更改。
如果你想更改此行为，可在构造方法中覆盖`AutoSave`属性。
>
>``` csharp
>/// <summary>
>/// 是否自动保存(调用SaveChangesAsync)
>/// </summary>
>public bool AutoSave { get; set; } = true;
>```

> **所有通过仓储调用的方法，并不会直接提交到数据库更改，你需要在恰当的时机，手动调用`SaveChangesAsync()`方法。**

在`Manager`中实现自定义业务，通常包括 `筛选查询`,`添加实体`,`更新实体`.

### 筛选查询

构建自定义查询条件的步骤：

1. 构造自己的查询条件`Queryable`
2. 调用`FilterAsync<T>`方法获取结果

代码示例：

```csharp

public override async Task<PageList<DiscussItemDto>> FilterAsync(DiscussFilterDto filter)
{
    // 根据实际业务构建筛选条件
    if (filter.IsTop != null)
    {
        Queryable = Queryable.Where(q => q.IsTop == filter.IsTop);
    }
    if (filter.MemberId != null)
    {
        Queryable = Queryable.Where(q => q.Member.Id == filter.MemberId);
    }
    return await Query.FilterAsync<DiscussItemDto>(Queryable, filter.PageIndex, filter.PageSize);
}
```

### 新增实体

代码示例:

```csharp
public override async Task<Discuss> AddAsync(Discuss entity)
{
    var res = await Command.CreateAsync(entity);
    // TODO: do something
    // 提交更新
    await Command.SaveChangeAsync();
    return res;
}
```

### 更新实体

`Manager`提供了`GetCurrentAsync`方法来获取当前(`可写数据库上下文`)的实体。

在控制器中，会先获取实体，如果不存在，则直接返回`404`。

实体更新的方法传递两个参数，一个是实体本身，一个是提交的`DTO`对象,
实体本身是在控制器当中使用`GetCurrentAsync`方法获取到的，直接作为参数传递过去即可。

代码示例:

以下方面演示如何更新关联的内容。

```csharp
public override async Task<ResourceTypeDefinition> UpdateAsync(ResourceTypeDefinition entity, ResourceTypeDefinitionUpdateDto dto)
    {
        // 更新关联的内容
        entity!.AttributeDefines = null;
        if (dto.AttributeDefineIds != null)
        {
            // 通过父类的 Stores 查询其他实体的内容
            var attributeDefines = await Stores.ResourceAttributeDefineCommand.Db.Where(a => dto.AttributeDefineIds.Contains(a.Id)).ToListAsync();
            entity.AttributeDefines = attributeDefines;
        }
        return await base.UpdateAsync(entity, dto);
    }
```

### 详情查询

`Manager`提供了默认的详情查询方法，可直接传递查询条件.

若自定义查询，如查询关联的内容，需要添加新的方法来实现.

`Manager`提供了`Query.Db`成员，可直接对当前模型进行查询。

代码示例:

```csharp
public async Task<ResourceGroup?> FindAsync(Guid id)
{
    return await Query.Db
        .Include(g => g.Environment)
        .FirstOrDefaultAsync(g => g.Id == id);
}
```

### 删除处理

删除默认为软删除，如果想修改该行为，可在`CommandStoreBase`类中将`EnableSoftDelete`设置为false.

如果只想针对某个实体取消，可在实体对应的`XXXCommandStore`类中，覆盖`EnableSoftDelete`，将其设置为false.

删除有时会涉及到**关联删除**，示例代码:

```csharp
public override async Task<Resource?> DeleteAsync(Guid id)
{
    var resource = entity;
    if (resource!.Attributes != null)
    {
        Stores.CommandContext.RemoveRange(resource.Attributes);
    }
    return await DeleteAsync(resource);
}

```

# 文档

更多文档说明，请查阅[使用文档](https://docs.dusi.dev/zh/ater.web/%E6%A6%82%E8%BF%B0.html)。
