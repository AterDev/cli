﻿namespace CodeGenerator.Generate;

/// <summary>
/// 表单生成
/// </summary>
public class NgFormGenerate : GenerateBase
{
    public NgFormGenerate()
    {
    }
    public static string GenerateAddForm(List<PropertyInfo>? propertyInfos, bool isMobile = false)
    {
        StringBuilder formControls = new();
        if (propertyInfos != null)
        {
            foreach (PropertyInfo input in propertyInfos)
            {
                NgComponentBuilder inputBuilder = new(input.Type, input.Name, input.CommentSummary ?? input.DisplayName)
                {
                    IsDecimal = input.IsDecimal,
                    IsRequired = input.IsRequired,
                    MaxLength = input.MaxLength,
                    MinLength = input.MinLength,
                    IsEnum = input.IsEnum,
                    IsList = input.IsList
                };
                formControls.AppendLine(inputBuilder.ToFormControl());
            }
        }
        string tplDir = isMobile ? "mobileAdd" : "add";
        string tplContent = GetTplContent($"angular.{tplDir}.add.component.html.tpl");
        tplContent = tplContent.Replace("", formControls.ToString());
        return tplContent;
    }

    public static string GenerateForm(List<PropertyInfo>? propertyInfos)
    {
        StringBuilder sb = new();
        if (propertyInfos != null)
        {
            foreach (PropertyInfo input in propertyInfos)   
            {
                NgComponentBuilder inputBuilder = new(input.Type, input.Name, input.CommentSummary ?? input.DisplayName)
                {
                    IsDecimal = input.IsDecimal,
                    IsRequired = input.IsRequired,
                    MaxLength = input.MaxLength,
                    MinLength = input.MinLength,
                    IsEnum = input.IsEnum,
                    IsList = input.IsList
                };
                sb.AppendLine(inputBuilder.ToFormControl());
            }
        }

        string tplContent = GetTplContent("angular.component.form.component.html.tpl");
        tplContent = tplContent.Replace("", sb.ToString());
        return tplContent;
    }

    public static string GenerateEditForm(List<PropertyInfo>? propertyInfos, bool isMobile = false)
    {
        StringBuilder formControls = new();
        if (propertyInfos != null)
        {
            foreach (PropertyInfo input in propertyInfos)
            {
                NgComponentBuilder inputBuilder = new(input.Type, input.Name, input.CommentSummary ?? input.DisplayName)
                {
                    IsDecimal = input.IsDecimal,
                    IsRequired = input.IsRequired,
                    MaxLength = input.MaxLength,
                    MinLength = input.MinLength,
                    IsEnum = input.IsEnum,
                    IsList = input.IsList
                };
                formControls.AppendLine(inputBuilder.ToFormControl());
            }
        }
        string tplDir = isMobile ? "mobileEdit" : "edit";
        string tplContent = GetTplContent($"angular.{tplDir}.edit.component.html.tpl");
        tplContent = tplContent.Replace("", formControls.ToString());
        return tplContent;
    }
}
