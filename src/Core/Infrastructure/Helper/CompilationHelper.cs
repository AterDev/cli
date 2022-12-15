﻿using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Core.Infrastructure.Helper;

public class CompilationHelper
{
    public CSharpCompilation Compilation { get; set; }

    public SemanticModel? SemanticModel { get; set; }
    public ITypeSymbol? ClassSymbol { get; set; }
    public SyntaxTree? SyntaxTree { get; set; }
    public CompilationHelper()
    {
        Compilation = CSharpCompilation.Create("tmp");
    }
    public CompilationHelper(string path, string? dllFilter = null)
    {
        string suffix = DateTime.Now.ToString("HHmmss");
        Compilation = CSharpCompilation.Create("tmp" + suffix);
        AddDllReferences(path, dllFilter);
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
    public IEnumerable<INamedTypeSymbol> GetAllClasses()
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
        IEnumerable<INamedTypeSymbol> all = GetAllClasses();
        return GetAllClasses()
            .Where(c => c.BaseType != null
                && c.BaseType.Name.Equals("Enum"))
            .Select(c => c.Name)
            .Distinct()
            .ToList();
    }

    public INamedTypeSymbol? GetClass(string name)
    {
        return GetAllClasses().Where(cls => cls.Name == name).FirstOrDefault();
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
        List<INamedTypeSymbol> classes = new();
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

}
