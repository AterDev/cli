﻿using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Editing;
using Microsoft.CodeAnalysis.Formatting;

namespace Core.Infrastructure.Helper;
/// <summary>
/// c# 分析帮助类
/// </summary>
public class CSharpAnalysisHelper
{
    public static async Task<INamedTypeSymbol?> GetBaseInterfaceInfoAsync(CSharpCompilation compilation, SyntaxTree tree)
    {
        var root = await tree.GetRootAsync();
        var semanticModel = compilation.GetSemanticModel(tree);

        var interfaceDeclaration = root?.DescendantNodes().OfType<InterfaceDeclarationSyntax>()
            .FirstOrDefault();
        if (interfaceDeclaration != null)
        {
            var baseInterface = interfaceDeclaration.BaseList?.Types.First().Type;
            if (baseInterface == null) { return default; }
            var baseType = semanticModel.GetTypeInfo(baseInterface).Type as INamedTypeSymbol;
            return baseType;
        }
        return default;
    }

    public static string FormatChanges(SyntaxNode node)
    {
        var workspace = new AdhocWorkspace();
        var options = workspace.Options
            // change these values to fit your environment / preferences 
            .WithChangedOption(FormattingOptions.UseTabs, LanguageNames.CSharp, value: true)
            .WithChangedOption(FormattingOptions.NewLine, LanguageNames.CSharp, value: "\r\n");
        return Formatter.Format(node, workspace, options).ToFullString();
    }

    /// <summary>
    /// 内容节点编辑
    /// </summary>
    /// <typeparam name="TNode"></typeparam>
    /// <param name="editor"></param>
    /// <param name="node"></param>
    /// <param name="replacementNode"></param>
    public static void ReplaceNodeUsing<TNode>(DocumentEditor editor, TNode node, Func<TNode, SyntaxNode> replacementNode) where TNode : SyntaxNode
    {
        editor.ReplaceNode(node, (n, _) => replacementNode((TNode)n));
    }
}
