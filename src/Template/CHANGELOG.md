# CHANGELOG

## 9.0.0 更新内容

遵循着大道至简的理念，该版本对框架进行了进一步的简化，具体体现在：

### 移除内容
- 移除了`IQueryStore`,`IQueryStoreExt`，`ICommandStore`,`ICommandStoreExt`接口定义.
- 移除了`QuerySet`与`CommandSet`.
  
### ManagerBase改造

- 对`ManagerBase`类的进行简化重构，去除了`QuerySet`与`CommandSet`的依赖，直接使用`DbSet`，减少调用链，并简化相关方法的实现.
- 提供了与`TEntity`无关的`DataAccessContext`与`ManagerBase`，方法继承，直接使用数据库的读写上下文.
- 提供更多更灵活的数据库操作实现，`FilterAsync`已重写成`ToPageAsync`.


### 其他变更
- 基础库中的`AppConst`修改为`AterConst`，释放`AppConst`作为项目自定义常量使用.
- 

