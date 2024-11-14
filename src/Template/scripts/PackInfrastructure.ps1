[CmdletBinding()]
param (
    [Parameter()]
    [System.String]
    $version = "1.0.0"
)
$location = Get-Location
$infrastructurePath = Join-Path $location "../templates/ApiStandard/src/Infrastructure/"
$projects = @(
    "Ater.Web.Core/Ater.Web.Core.csproj", 
    "Ater.Web.Abstraction/Ater.Web.Abstraction.csproj", 
    "Ater.Web.Extension/Ater.Web.Extension.csproj")


$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8
try {
    
    foreach ($project in $projects) {

        $csprojPath = Join-Path $infrastructurePath $project
        $csproj = [xml](Get-Content $csprojPath)
        $node = $csproj.SelectSingleNode("//Version")
        $node.InnerText = $version
        $csproj.Save($csprojPath);
    }
    foreach ($project in $projects) {
        $csprojPath = Join-Path $infrastructurePath $project
        dotnet pack $csprojPath -o ../pack
    }
}
catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
}
finally {
    Set-Location $location
}