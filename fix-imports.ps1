$uiPath = Join-Path $PSScriptRoot "src\components\ui"
$files = Get-ChildItem -Path $uiPath -Filter "*.tsx" -File

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $updatedContent = $content -replace '@radix-ui/([a-z-]+)@[0-9.]+', '@radix-ui/$1'
    
    if ($updatedContent -ne $content) {
        Set-Content -Path $file.FullName -Value $updatedContent -NoNewline
        Write-Host "Fixed imports in $($file.Name)"
    }
}

Write-Host "All imports have been fixed!" -ForegroundColor Green
