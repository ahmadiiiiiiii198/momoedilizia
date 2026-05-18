$apiUrl = "https://gruppo-momo-edilizia.it/api/get-upload-url"
$supabaseUrl = "https://msqdvvetjyrnnvaqmqwr.supabase.co"
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcWR2dmV0anlybm52YXFtcXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTQ0MjgsImV4cCI6MjA5MDU3MDQyOH0.Qy8A6OkwS_f6LPXIH76kJ12A4l-NNys_cSz_qXaOL4s"

$uploads = @(
    @("hero1-compressed.mp4", "video/mp4", "hero_video_1"),
    @("hero2-compressed.mp4", "video/mp4", "hero_video_2"),
    @("hero3-compressed.mp4", "video/mp4", "hero_video_3"),
    @("hero4-compressed.mp4", "video/mp4", "hero_video_4"),
    @("hero-poster.jpg", "image/jpeg", "hero_poster_url")
)

$results = @()

foreach ($u in $uploads) {
    $filename = $u[0]
    $contentType = $u[1]
    $configKey = $u[2]
    $filePath = Join-Path $PSScriptRoot $filename
    
    Write-Host "[$configKey] Getting presigned URL for $filename..."
    $body = @{ filename = $filename; contentType = $contentType } | ConvertTo-Json
    $resp = Invoke-RestMethod -Uri $apiUrl -Method POST -Body $body -ContentType "application/json"
    
    Write-Host "[$configKey] Uploading to R2..."
    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
    Invoke-RestMethod -Uri $resp.uploadUrl -Method PUT -Body $fileBytes -ContentType $contentType | Out-Null
    
    $publicUrl = $resp.publicUrl
    Write-Host "[$configKey] Done! URL: $publicUrl"
    
    # Update Supabase site_config
    Write-Host "[$configKey] Updating database..."
    $headers = @{
        "apikey" = $supabaseKey
        "Authorization" = "Bearer $supabaseKey"
        "Content-Type" = "application/json"
        "Prefer" = "return=minimal"
    }
    
    # Check if key exists
    $existing = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/site_config?key=eq.$configKey&select=id" -Headers $headers
    
    if ($existing -and $existing.Count -gt 0) {
        # Update existing
        $updateBody = @{ value = $publicUrl } | ConvertTo-Json
        Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/site_config?key=eq.$configKey" -Method PATCH -Headers $headers -Body $updateBody | Out-Null
        Write-Host "[$configKey] Database updated!"
    } else {
        # Insert new
        $insertBody = @{ key = $configKey; value = $publicUrl } | ConvertTo-Json
        Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/site_config" -Method POST -Headers $headers -Body $insertBody | Out-Null
        Write-Host "[$configKey] Database entry created!"
    }
    
    Write-Host ""
    $results += "$configKey = $publicUrl"
}

Write-Host "===== ALL DONE ====="
foreach ($r in $results) { Write-Host $r }
