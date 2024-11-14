$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8

$location = Get-Location

# $infrastructurePath = Join-Path $location "../templates/ApiAspire/src/Infrastructure/"

$lightPath = Join-Path $location "../templates/ApiLight/src/Infrastructure/"
$standardPath = Join-Path $location "../templates/ApiStandard/src/Infrastructure/"
$projects = @(
    "Ater.Web.Core", 
    "Ater.Web.Abstraction", 
    "Ater.Web.Extension")    
try {
    
    foreach ($project in $projects) {
        $projectPath = Join-Path $standardPath $project
        Copy-Item -Path $projectPath -Destination $lightPath -Recurse -Force
        # Copy-Item -Path $projectPath -Destination $infrastructurePath -Recurse -Force
    }
}
catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
}
finally {
    Set-Location $location
}