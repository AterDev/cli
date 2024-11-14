<# 
本脚本是用来同步前端维护的menus.json到数据库
本脚本由前端开发人员执行，执行前先确定路径和url符合实际情况
如果要更新生产环境，请携带参数 production
json格式示例:
[
  {
    "name": "系统设置",
    "accessCode": "80000",
    "menuType": 0,
    "children": []
  }
]
#>

[CmdletBinding()]
param (
  [Parameter()]
  [String]
  $Environment
)
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

$location = Get-Location
cd ./src
# 定义前端menus.json路径
$content = Get-Content .\json\menus.json  -Encoding UTF8
$url = 'http://localhost:5002'

try {
  if ($Environment.ToLower() -eq 'production') {
    # 定义生产环境地址
    $url = 'https://production.com'
    Write-Host "production"
  }
  
  $url = $url + '/api/admin/SystemMenu/sync/MyProjectNameDefaultKey'
  Write-Host 'request:'$url;
  $res = Invoke-RestMethod -Method 'Post' -Uri $url -Body ($content) -ContentType "application/json;charset=utf-8" 
  Write-Host $res
}
catch [System.Exception] { 
  Write-Error $_
}

cd $location
