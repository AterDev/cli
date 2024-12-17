$location = Get-Location

dry client http://localhost:5204/swagger/admin/swagger.json -o ../src/ApiClients
dry client http://localhost:5204/swagger/client/swagger.json -o ../src/ApiClients

Set-Location $location