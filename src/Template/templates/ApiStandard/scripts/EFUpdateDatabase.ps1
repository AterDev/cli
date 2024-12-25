# Description: Script to update the database using EF Core

$location = Get-Location
Set-Location ../src/MigrationService
dotnet run
Set-Location $location
