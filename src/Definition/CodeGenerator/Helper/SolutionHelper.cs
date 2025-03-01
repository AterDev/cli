﻿using Microsoft.Build.Locator;
using Microsoft.CodeAnalysis.Editing;
using Microsoft.CodeAnalysis.MSBuild;

namespace CodeGenerator.Helper;
/// <summary>
/// 解决方案解析帮助类
/// </summary>
public class SolutionHelper : IDisposable
{
    public MSBuildWorkspace Workspace { get; set; }
    public Solution Solution { get; private set; }

    public SolutionHelper(string path)
    {
        if (!File.Exists(path))
        {
            throw new FileNotFoundException("解决方案文件不存在");
        }
        try
        {
            if (!MSBuildLocator.IsRegistered)
            {
                MSBuildLocator.RegisterDefaults();
            }
            Workspace = MSBuildWorkspace.Create();
            Solution = Workspace.OpenSolutionAsync(path).Result;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="projectName"></param>
    /// <returns></returns>
    public Microsoft.CodeAnalysis.Project? GetProject(string projectName)
    {
        return Solution.Projects.FirstOrDefault(p => p.AssemblyName == projectName);
    }

    /// <summary>
    /// 添加项目
    /// </summary>
    /// <param name="projectPath"></param>
    /// <returns></returns>
    public bool AddExistProject(string projectPath)
    {
        if (!File.Exists(projectPath))
        {
            throw new FileNotFoundException("项目文件不存在:" + projectPath);
        }
        if (!ProcessHelper.RunCommand("dotnet", $"sln {Solution.FilePath} add {projectPath}", out string _))
        {
            return false;
        }
        if (Solution.Projects.Any(p => p.FilePath!.Equals(projectPath)))
        {
            return false;
        }
        Microsoft.CodeAnalysis.Project project = Workspace.OpenProjectAsync(projectPath).Result;
        // add opened project to solution
        Solution = project.Solution;
        return true;
    }

    /// <summary>
    /// 添加项目引用
    /// </summary>
    /// <param name="currentProject"></param>
    /// <param name="referenceProject"></param>
    public bool AddProjectReference(Microsoft.CodeAnalysis.Project currentProject, Microsoft.CodeAnalysis.Project referenceProject)
    {
        if (!ProcessHelper.RunCommand("dotnet", $"add {currentProject.FilePath} reference {referenceProject.FilePath}", out string _))
        {
            return false;
        }
        //Solution = Solution.AddProjectReference(currentProject.Id, new ProjectReference(referenceProject.Id));
        return true;
    }

    /// <summary>
    /// 重命名Namespace
    /// </summary>
    /// <param name="oldName"></param>
    /// <param name="newName">为空时，则删除原名称</param>
    /// <param name="projectName"></param>
    public void RenameNamespace(string oldName, string newName, string? projectName = null)
    {
        IEnumerable<Microsoft.CodeAnalysis.Project> projects = Solution.Projects.GroupBy(p => p.AssemblyName)
            .Select(g => g.First());
        if (projectName != null)
        {
            projects = projects.Where(p => p.AssemblyName == projectName);
        }
        Parallel.ForEach(projects, p =>
        {
            Parallel.ForEach(p.Documents, d =>
            {
                if (d.Folders.Count > 0 && d.Folders[0].Equals("obj"))
                {
                    return;
                }
                if (d.FilePath != null)
                {
                    string path = d.FilePath.Replace(Path.AltDirectorySeparatorChar, Path.DirectorySeparatorChar);

                    if (!File.Exists(path))
                    {
                        return;
                    }
                    string content = File.ReadAllText(path);

                    string newNamespace = string.IsNullOrWhiteSpace(newName) ? string.Empty : "namespace " + newName;
                    string newUsing = string.IsNullOrWhiteSpace(newName) ? string.Empty : "using " + newName;
                    content = content.Replace("namespace " + oldName, newNamespace)
                                     .Replace("using " + oldName, newUsing)
                                     .Replace("cref=\"" + oldName, "cref=\"" + newName);
                    File.WriteAllText(d.FilePath, content, new UTF8Encoding(false));
                }
            });
        });
    }

    public void RemoveAttributes(string projectName, string attributeName)
    {
        Microsoft.CodeAnalysis.Project? project = Solution.Projects.FirstOrDefault(p => p.AssemblyName == projectName);
        if (project != null)
        {
            DocumentEditor editor;
            List<Document> documents = project.Documents.Where(d => d.FilePath != null && d.FilePath.EndsWith(".cs")).ToList();

            documents.ForEach(document =>
            {
                editor = DocumentEditor.CreateAsync(document).Result;
                IEnumerable<AttributeSyntax> nodes = editor.OriginalRoot
                    .DescendantNodes().OfType<AttributeSyntax>()
                    .Where(a => a.Name.ToString() == attributeName);

                if (nodes == null) { return; }
                foreach (AttributeSyntax? node in nodes)
                {
                    editor.RemoveNode(node);
                }
                string newContent = CSharpAnalysisHelper.FormatChanges(editor.GetChangedRoot());

                File.WriteAllText(document.FilePath!, newContent, new UTF8Encoding(false));
            });
        }
    }

    /// <summary>
    /// 从解决方案中移除项目
    /// </summary>
    /// <param name="projectName"></param>
    public bool RemoveProject(string projectName)
    {
        Microsoft.CodeAnalysis.Project? project = Solution.Projects.FirstOrDefault(p => p.AssemblyName == projectName);
        if (project != null)
        {
            if (!ProcessHelper.RunCommand("dotnet", $"sln {Solution.FilePath} remove {project.FilePath}", out string _))
            {
                return false;
            }
            Solution = Solution.RemoveProject(project.Id);
            return true;
        }
        return false;
    }

    /// <summary>
    /// get projects which reference the give project name
    /// </summary>
    /// <param name="pName"></param>
    /// <returns></returns>
    public List<Microsoft.CodeAnalysis.Project>? GetReferenceProject(string pName)
    {
        Microsoft.CodeAnalysis.Project? project = Solution.Projects.FirstOrDefault(p => p.AssemblyName == pName);
        if (project == null) return default;
        List<Microsoft.CodeAnalysis.Project> projects = Solution.Projects.Where(p => p.AllProjectReferences.Any(r => r.ProjectId == project.Id))
            .ToList();
        return projects;
    }

    /// <summary>
    /// 删除项目引用
    /// </summary>
    /// <param name="currentProject"></param>
    /// <param name="referenceProject"></param>
    public bool RemoveProjectReference(Microsoft.CodeAnalysis.Project currentProject, Microsoft.CodeAnalysis.Project referenceProject)
    {
        if (!ProcessHelper.RunCommand("dotnet", $"remove {currentProject.FilePath} reference {referenceProject.FilePath}", out string _))
        {
            return false;
        }

        Solution = Solution.RemoveProjectReference(currentProject.Id, new ProjectReference(referenceProject.Id));
        return true;
    }


    /// <summary>
    /// 移动文件
    /// </summary>
    /// <param name="projectName"></param>
    /// <param name="documentPath"></param>
    /// <param name="newPath"></param>
    /// <param name="namespaceName"></param>
    /// <returns></returns>
    public async Task MoveDocumentAsync(string projectName, string documentPath, string newPath, string? namespaceName = null)
    {
        Microsoft.CodeAnalysis.Project? project = Solution.Projects.FirstOrDefault(p => p.AssemblyName == projectName);
        if (project == null)
        {
            await Console.Out.WriteLineAsync(" can't find project:" + projectName);
            return;
        }

        Document? document = project?.Documents.FirstOrDefault(d => d.FilePath == documentPath);
        if (document != null)
        {
            namespaceName ??= project!.Name;
            string oldClassName = Path.GetFileNameWithoutExtension(documentPath);
            string newClassName = Path.GetFileNameWithoutExtension(newPath);

            SyntaxNode? unitRoot = await document.GetSyntaxRootAsync();

            // 同步命名空间
            FileScopedNamespaceDeclarationSyntax? namespaceSyntax = unitRoot!.DescendantNodes()
                .OfType<FileScopedNamespaceDeclarationSyntax>().FirstOrDefault();

            if (namespaceSyntax != null)
            {
                var newNamespaceSyntax = namespaceSyntax.WithName(SyntaxFactory.ParseName(namespaceName));
                unitRoot = unitRoot.ReplaceNode(namespaceSyntax, newNamespaceSyntax);
            }

            // 同步文件类名
            ClassDeclarationSyntax? classSyntax = unitRoot!.DescendantNodes()
                .OfType<ClassDeclarationSyntax>().FirstOrDefault();
            if (classSyntax != null && oldClassName != newClassName)
            {
                // use newClassName replace the oldClassName
                var newClassSyntax = classSyntax.WithIdentifier(SyntaxFactory.Identifier(newClassName));
                unitRoot = unitRoot.ReplaceNode(classSyntax, newClassSyntax);
            }

            document = document.WithSyntaxRoot(unitRoot)
                .WithFilePath(newPath);

            // update document to solution
            Solution = Solution.WithDocumentSyntaxRoot(document.Id, unitRoot)
                .WithDocumentFilePath(document.Id, newPath);

            // move file
            File.Delete(documentPath);
            await File.WriteAllTextAsync(newPath, document.GetTextAsync().Result!.ToString(), new UTF8Encoding(false));
        }
    }

    /// <summary>
    /// 删除文件
    /// </summary>
    /// <param name="projectName"></param>
    /// <param name="documentPaths"></param>
    /// <returns></returns>
    public async Task RemoveFileAsync(string projectName, string[] documentPaths)
    {
        if (documentPaths.Length == 0)
        {
            return;
        }
        Microsoft.CodeAnalysis.Project? project = Solution.Projects.FirstOrDefault(p => p.AssemblyName == projectName);
        if (project == null)
        {
            await Console.Out.WriteLineAsync(" can't find project:" + projectName);
            return;
        }
        foreach (string documentPath in documentPaths)
        {
            Document? document = project?.Documents.FirstOrDefault(d => d.FilePath == documentPath);
            if (document != null)
            {
                project = project!.RemoveDocument(document.Id);
                Solution = project.Solution;
                File.Delete(documentPath);
            }
        }
    }


    public bool Save()
    {
        return Workspace.TryApplyChanges(Solution);
    }

    public void Dispose()
    {
        Workspace.CloseSolution();
        Workspace.Dispose();
        MSBuildLocator.Unregister();
    }

}
