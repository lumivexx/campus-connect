# Simple PowerShell HTTP Server for local MVP testing
param (
    [int]$Port = 3000,
    [string]$Path = $PSScriptRoot
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
    Write-Host "Campus Connect AI Server running at http://localhost:$Port/"
    
    $mimeMapping = @{
        ".html" = "text/html; charset=utf-8"
        ".css"  = "text/css; charset=utf-8"
        ".js"   = "application/javascript; charset=utf-8"
        ".json" = "application/json; charset=utf-8"
        ".svg"  = "image/svg+xml"
        ".png"  = "image/png"
        ".jpg"  = "image/jpeg"
        ".jpeg" = "image/jpeg"
        ".ico"  = "image/x-icon"
    }

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        $localFilePath = Join-Path $Path ($urlPath.TrimStart('/').Replace('/', '\'))

        if (Test-Path $localFilePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
            $contentType = if ($mimeMapping.ContainsKey($ext)) { $mimeMapping[$ext] } else { "application/octet-stream" }
            
            $response.ContentType = $contentType
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Cache-Control", "no-cache")
            
            $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    }
}
catch {
    Write-Host "Server error: $_"
}
finally {
    $listener.Stop()
    $listener.Close()
}
