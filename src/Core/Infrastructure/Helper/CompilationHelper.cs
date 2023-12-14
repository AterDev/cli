﻿using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Core.Infrastructure.Helper;

public class CompilationHelper
{
    public CSharpCompilation Compilation { get; set; }

    public SemanticModel? SemanticModel { get; set; }
    public ITypeSymbol? ClassSymbol { get; set; }
    public SyntaxTree? SyntaxTree { get; set; }
    public IEnumerable<INamedTypeSymbol> AllClass { get; set; }
    public CompilationUnitSyntax? SyntaxRoot { get; set; }

    public string EntityPath { get; set; }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="path">程序集路径</param>
    /// <param name="dllFilter"></param>
    public CompilationHelper(string path, string? dllFilter = null)
    {
        string suffix = DateTime.Now.ToString("HHmmss");
        Compilation = CSharpCompilation.Create("tmp" + suffix);
        EntityPath = path;
        AddDllReferences(path, dllFilter);
        AllClass = GetAllClasses();
    }
    public void AddDllReferences(string path, string? dllFilter = null)
    {
        List<string> dlls = Directory.EnumerateFiles(path, "*.dll", SearchOption.AllDirectories)
                  .Where(dll =>
                  {
                      if (!string.IsNullOrEmpty(dllFilter))
                      {
                          string fileName = Path.GetFileName(dll);
                          return fileName.ToLower().StartsWith(dllFilter.ToLower());
                      }
                      else
                      {
                          return true;
                      }
                  }).ToList();

        Compilation = Compilation.AddReferences(dlls.Select(dll => MetadataReference.CreateFromFile(dll)))
            .WithOptions(new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));
    }

    public void AddSyntaxTree(string content)
    {
        SyntaxTree = CSharpSyntaxTree.ParseText(content);
        SyntaxRoot = SyntaxTree!.GetCompilationUnitRoot();
        Compilation = Compilation.AddSyntaxTrees(SyntaxTree);
        SemanticModel = Compilation.GetSemanticModel(SyntaxTree);

        ClassDeclarationSyntax? classNode = SyntaxTree.GetCompilationUnitRoot().DescendantNodes().OfType<ClassDeclarationSyntax>().FirstOrDefault();
        ClassSymbol = classNode == null ? null : SemanticModel.GetDeclaredSymbol(classNode);
    }

    /// <summary>
    /// 获取命名空间
    /// </summary>
    /// <returns></returns>
    public string? GetNamesapce()
    {
        IEnumerable<SyntaxNode>? rootNodes = SyntaxTree?.GetCompilationUnitRoot().DescendantNodes();
        NamespaceDeclarationSyntax? namespaceDeclarationSyntax = rootNodes!.OfType<NamespaceDeclarationSyntax>().FirstOrDefault();

        FileScopedNamespaceDeclarationSyntax? filescopeNamespaceDeclarationSyntax = rootNodes!.OfType<FileScopedNamespaceDeclarationSyntax>().FirstOrDefault();

        return namespaceDeclarationSyntax == null ?
            filescopeNamespaceDeclarationSyntax?.Name.ToString() : namespaceDeclarationSyntax.Name.ToString();
    }

    /// <summary>
    /// 获取所有类型
    /// </summary>
    /// <returns></returns>
    protected IEnumerable<INamedTypeSymbol> GetAllClasses()
    {
        IEnumerable<INamespaceSymbol> namespaces = Compilation.GlobalNamespace.GetNamespaceMembers();
        return GetNamespacesClasses(namespaces);
    }

    /// <summary>
    /// 获取所有枚举类型名称
    /// </summary>
    /// <returns></returns>
    public List<string> GetAllEnumClasses()
    {
        // TODO:枚举可以存储，不用每次获取 
        return AllClass.Where(c => c.BaseType != null
                && c.BaseType.Name.Equals("Enum"))
            .Select(c => c.Name)
            .Distinct()
            .ToList();
    }

    public INamedTypeSymbol? GetEnum(string name)
    {
        return AllClass.Where(c => c.Name == name)
            .Where(c => c.BaseType != null
                && c.BaseType.Name.Equals("Enum"))
            .FirstOrDefault();
    }

    public INamedTypeSymbol? GetClass(string name)
    {
        return AllClass.Where(cls => cls.Name == name).FirstOrDefault();
    }

    /// <summary>
    /// 获取一组类型的命名空间
    /// </summary>
    /// <param name="classNames"></param>
    public List<string> GetNamespaceNames(List<string> classNames)
    {
        return AllClass.Where(cls => classNames.Contains(cls.Name))
            .Select(cls => cls.ContainingNamespace.ToDisplayString())
            .Distinct()
            .ToList();
    }

    /// <summary>
    /// 获取的指定基类的所有子类
    /// </summary>
    /// <param name="namedTypes">要查找所有类集合</param>
    /// <param name="baseTypeName">基类名称</param>
    /// <returns></returns>
    public static IEnumerable<INamedTypeSymbol> GetClassNameByBaseType(IEnumerable<INamedTypeSymbol> namedTypes, string baseTypeName)
    {
        return namedTypes
            .Where(c => c.BaseType != null
                && c.BaseType.Name.Equals(baseTypeName))
            .ToList();
    }

    /// <summary>
    /// 获取命名空间下的类型
    /// </summary>
    /// <param name="namespaces"></param>
    /// <returns></returns>
    protected IEnumerable<INamedTypeSymbol> GetNamespacesClasses(IEnumerable<INamespaceSymbol> namespaces)
    {
        List<INamedTypeSymbol> classes = [];
        classes = namespaces.SelectMany(n => n.GetTypeMembers()).ToList();
        List<INamespaceSymbol> childNamespaces = namespaces.SelectMany(n => n.GetNamespaceMembers()).ToList();
        if (childNamespaces.Count > 0)
        {
            IEnumerable<INamedTypeSymbol> childClasses = GetNamespacesClasses(childNamespaces);
            classes.AddRange(childClasses);
            return classes;
        }

        return classes;
    }


    /// <summary>
    /// 是否存在某方法
    /// </summary>
    /// <param name="methodContent"></param>
    /// <returns></returns>
    public bool MethodExist(string methodContent)
    {
        return SyntaxRoot!.DescendantNodes()
            .Where(n => n is MethodDeclarationSyntax)
            .Any(m => m.ToString().Contains(methodContent));
    }

    /// <summary>
    /// 是否存在属性
    /// </summary>
    /// <param name="propertyName"></param>
    /// <returns></returns>
    public bool PropertyExist(string propertyName)
    {
        return SyntaxRoot!.DescendantNodes()
            .OfType<PropertyDeclarationSyntax>()
            .Any(m => m.Identifier.Text.Equals(propertyName.Trim()));
    }

    /// <summary>
    /// 向接口插入方法
    /// </summary>
    /// <param name="methodContent"></param>
    public void InsertInterfaceMethod(string methodContent)
    {
        if (SyntaxTree != null && SyntaxRoot != null)
        {
            InterfaceDeclarationSyntax interfaceDeclaration = SyntaxRoot.DescendantNodes()
                .OfType<InterfaceDeclarationSyntax>().Single();

            methodContent = $"    {methodContent}" + Environment.NewLine;
            if (SyntaxFactory.ParseMemberDeclaration(methodContent) is not MethodDeclarationSyntax methodNode)
            {
                return;
            }
            InterfaceDeclarationSyntax newInterfaceDeclaration = interfaceDeclaration.AddMembers(methodNode);
            SyntaxRoot = SyntaxRoot.ReplaceNode(interfaceDeclaration, newInterfaceDeclaration);
        }
    }

    public void InsertClassMethod(string methodContent)
    {
        if (SyntaxTree != null && SyntaxRoot != null)
        {
            ClassDeclarationSyntax? classDeclaration = SyntaxRoot.DescendantNodes()
                .OfType<ClassDeclarationSyntax>().FirstOrDefault();
            if (classDeclaration != null)
            {
                methodContent = $"    {methodContent}" + Environment.NewLine;
                if (SyntaxFactory.ParseMemberDeclaration(methodContent) is not MethodDeclarationSyntax methodNode)
                {
                    return;
                }
                ClassDeclarationSyntax newClassDeclaration = classDeclaration.AddMembers(methodNode);
                SyntaxRoot = SyntaxRoot.ReplaceNode(classDeclaration, newClassDeclaration);
            }
        }
    }
    public void ReplaceInterfaceImplement(string newImplementContent)
    {
        // replace interface first node  with new node 
        if (SyntaxTree != null && SyntaxRoot != null)
        {
            InterfaceDeclarationSyntax interfaceNode = SyntaxRoot.DescendantNodes()
                .OfType<InterfaceDeclarationSyntax>().First();
            BaseListSyntax oldBaseList = interfaceNode.DescendantNodes().OfType<BaseListSyntax>().Single();

            if (oldBaseList != null)
            {
                TypeSyntax typeName = SyntaxFactory.ParseTypeName(newImplementContent);
                SimpleBaseTypeSyntax baseType = SyntaxFactory.SimpleBaseType(typeName);

                // add space and newline to baseType 
                SyntaxToken newColonToken = SyntaxFactory.Token(SyntaxKind.ColonToken)
                  .WithTrailingTrivia(SyntaxFactory.Space);

                BaseListSyntax newBaseList = SyntaxFactory.BaseList(
                  SyntaxFactory.SingletonSeparatedList<BaseTypeSyntax>(baseType))
                  .WithTrailingTrivia(SyntaxFactory.LineFeed)
                  .WithColonToken(newColonToken);

                InterfaceDeclarationSyntax newInterfaceNode = interfaceNode.ReplaceNode(oldBaseList, newBaseList);
                SyntaxRoot = SyntaxRoot.ReplaceNode(interfaceNode, newInterfaceNode);
            }

        }
    }

    /// <summary>
    /// 添加基类
    /// </summary>
    /// <param name="newImplementContent"></param>
    public void AddClassBaseType(string newImplementContent)
    {
        if (SyntaxTree != null && SyntaxRoot != null)
        {
            ClassDeclarationSyntax classNode = SyntaxRoot.DescendantNodes()
                .OfType<ClassDeclarationSyntax>().First();

            TypeSyntax typeName = SyntaxFactory.ParseTypeName(newImplementContent);
            SimpleBaseTypeSyntax baseType = SyntaxFactory.SimpleBaseType(typeName);

            // add space and newline to baseType 
            SyntaxToken newColonToken = SyntaxFactory.Token(SyntaxKind.ColonToken)
              .WithTrailingTrivia(SyntaxFactory.Space);

            BaseListSyntax newBaseList = SyntaxFactory.BaseList(
              SyntaxFactory.SingletonSeparatedList<BaseTypeSyntax>(baseType))
                  .WithTrailingTrivia(SyntaxFactory.LineFeed)
                  .WithColonToken(newColonToken);

            ClassDeclarationSyntax newInterfaceNode = classNode.WithBaseList(newBaseList);
            SyntaxRoot = SyntaxRoot.ReplaceNode(classNode, newInterfaceNode);

        }
    }

    /// <summary>
    /// 向类中添加属性
    /// </summary>
    /// <param name="propertyContent"></param>
    public void AddClassProperty(string propertyContent)
    {
        if (SyntaxTree != null && SyntaxRoot != null)
        {
            ClassDeclarationSyntax classNode = SyntaxRoot.DescendantNodes()
                .OfType<ClassDeclarationSyntax>().First();

            var methodDeclaration = classNode.DescendantNodes().OfType<MethodDeclarationSyntax>().FirstOrDefault();
            if (methodDeclaration != null)
            {
                propertyContent = $"    {propertyContent}" + Environment.NewLine;
                if (SyntaxFactory.ParseMemberDeclaration(propertyContent) is not PropertyDeclarationSyntax propertyNode)
                {
                    return;
                }
                SyntaxRoot = SyntaxRoot.InsertNodesBefore(methodDeclaration, new[] { propertyNode });
            }
        }
    }

    /// <summary>
    /// 获取所有属性类型
    /// </summary>
    /// <returns></returns>
    public List<string> GetPropertyTypes()
    {
        // get all properties from class
        List<PropertyDeclarationSyntax> properties = SyntaxRoot!.DescendantNodes()
            .OfType<PropertyDeclarationSyntax>()
            .ToList();

        // get  generic type  from PropertyDeclarationSyntax
        List<string> genericTypes = properties
            .Select(p => p.Type)
            .OfType<GenericNameSyntax>()
            .Select(t => t.TypeArgumentList.Arguments.First().ToString())
            .ToList();

        return genericTypes;
    }

    /// <summary>
    /// 获取父类名称
    /// </summary>
    /// <returns></returns>
    public string? GetParentClassName()
    {
        ClassDeclarationSyntax? classNode = SyntaxTree!.GetCompilationUnitRoot().DescendantNodes().OfType<ClassDeclarationSyntax>().FirstOrDefault();

        return classNode?.BaseList?.Types.FirstOrDefault()?.ToString();
    }

    /// <summary>
    /// get class attribution 
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public List<AttributeSyntax>? GetClassAttribution(string? name = null)
    {
        ClassDeclarationSyntax? classNode = SyntaxTree!.GetCompilationUnitRoot().DescendantNodes().OfType<ClassDeclarationSyntax>().FirstOrDefault();

        List<AttributeSyntax>? classAttribution = classNode?.AttributeLists.SelectMany(a => a.Attributes).ToList();

        if (name != null)
        {
            classAttribution = classAttribution?.Where(a => a.Name.ToString().Equals(name)).ToList();
        }
        return classAttribution;
    }


    /// <summary>
    /// 获取特性参数值
    /// </summary>
    /// <param name="argument"></param>
    /// <returns></returns>
    public string? GetArgumentValue(AttributeArgumentSyntax argument)
    {

        string? name = null;
        if (argument.Expression is LiteralExpressionSyntax literal)
        {
            name = literal.Token.ValueText;
        }
        // 常量特殊处理，获取常量值
        else if (argument.Expression is MemberAccessExpressionSyntax memberAccess)
        {
            var className = ((IdentifierNameSyntax)memberAccess.Expression).Identifier.Text;
            var varName = memberAccess.Name.ToString();

            var constClass = GetClass(className);

            if (constClass != null)
            {
                var field = constClass.GetMembers()
                    .Where(m => m.Name == varName)
                    .FirstOrDefault();
                name = (field as IFieldSymbol)?.ConstantValue?.ToString();
            }
        }
        return name;
    }


}
