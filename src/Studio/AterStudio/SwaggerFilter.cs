using System.Text.Json.Nodes;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace AterStudio;

public class SwaggerFilter
{
}

public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema model, SchemaFilterContext context)
    {
        if (context.Type.IsEnum)
        {
            var name = new JsonArray();
            var enumData = new JsonArray();

            System.Reflection.FieldInfo[] fields = context.Type.GetFields();
            foreach (System.Reflection.FieldInfo f in fields)
            {
                if (f.Name != "value__")
                {
                    name.Add(f.Name);
                    System.Reflection.CustomAttributeData? desAttr = f.CustomAttributes.Where(a => a.AttributeType.Name == "DescriptionAttribute").FirstOrDefault();

                    desAttr ??= f.CustomAttributes.Where(a => a.AttributeType.Name == "DisplayAttribute").FirstOrDefault();

                    if (desAttr != null)
                    {
                        System.Reflection.CustomAttributeTypedArgument des = desAttr.ConstructorArguments.FirstOrDefault();
                        if (des.Value != null)
                        {
                            enumData.Add(new JsonObject()
                            {
                                ["name"] = f.Name,
                                ["value"] = (int)f.GetRawConstantValue()!,
                                ["description"] = des.Value.ToString()
                            });
                        }
                    }
                }
            }
            model.Extensions.Add("x-enumNames", new OpenApiAny(name));
            model.Extensions.Add("x-enumData", new OpenApiAny(enumData));
        }
    }
}
