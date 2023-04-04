Set-Location $PSScriptRoot
$currentIndexHtml = Get-Content .\index.html -Encoding UTF8
$currentIndexHtml = $currentIndexHtml -replace '\?v=([a-f0-9\.-]+)"', "?v=$([System.Guid]::NewGuid().ToString())`""
$currentIndexHtml | Set-Content -Path .\index.html -Encoding UTF8

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Write-Output $currentIndexHtml 
