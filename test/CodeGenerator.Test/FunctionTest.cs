﻿using CodeGenerator.Infrastructure.Helper;

namespace CodeGenerator.Test;
public class FunctionTest
{
    [Fact]
    public void Should_parse_entity_attribute()
    {
        var entityPath = @"D:\codes\dusi.dev\src\Core\Entities\EntityDesign\EntityLibrary.cs";
        var helper = new EntityParseHelper(entityPath);
        helper.Parse();
        Console.WriteLine();
    }
}
