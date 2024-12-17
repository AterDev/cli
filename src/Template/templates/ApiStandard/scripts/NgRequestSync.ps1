$location = Get-Location

dry ng http://localhost:5204/swagger/admin/swagger.json -o ../src/WebApp\src\app

Set-Location $location