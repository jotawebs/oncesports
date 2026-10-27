<#
.SYNOPSIS
    Script de extracción y actualización del tipo de cambio oficial del BCV (Banco Central de Venezuela).
.DESCRIPTION
    Obtiene la tasa oficial de cambio del BCV para el dólar (USD) y otras divisas,
    extrayendo el valor numérico y la fecha valor, guardándolo directamente en un archivo
    JSON y en variables de entorno (.env) para consumo en catálogos web.
#>

[CmdletBinding()]
param (
    [string]$OutputDir = $PSScriptRoot
)

if (-not $OutputDir) {
    $OutputDir = "C:\Users\carlo\.gemini\antigravity\scratch\bcv-exchange-rate"
}

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "[$((Get-Date).ToString('yyyy-MM-dd HH:mm:ss'))] Conectando con el Banco Central de Venezuela (BCV)..." -ForegroundColor Cyan

$url = "https://www.bcv.org.ve/"
$userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

try {
    # Ejecutamos curl.exe con bypass de certificados SSL (los servidores del BCV frecuentemente presentan problemas de cadena SSL)
    $lines = & curl.exe -k -s -L --max-time 20 -A $userAgent $url
    if (-not $lines -or $lines.Count -eq 0) {
        throw "No se obtuvo respuesta de la página del BCV."
    }
    $html = $lines -join "`n"
}
catch {
    Write-Error "Error al conectar con la página del BCV: $_"
    exit 1
}

# 1. Extracción del Dólar (USD)
$dolarPattern = 'id="dolar"[\s\S]*?<strong[^>]*>\s*([0-9.,]+)\s*</strong>'
if ($html -match $dolarPattern) {
    $usdRaw = $Matches[1].Trim()
    $usdClean = $usdRaw.Replace(".", "").Replace(",", ".")
    $usdValue = [double]$usdClean
} else {
    Write-Error "No se encontró el contenedor de la tasa de cambio del dólar en el HTML."
    exit 1
}

# 2. Extracción de Fecha Valor
$fechaValorIso = ""
$fechaValorTexto = ""
$fechaPattern = 'Fecha Valor:\s*<span[^>]*content="([^"]+)"[^>]*>([^<]+)</span>'
if ($html -match $fechaPattern) {
    $fechaValorIso = $Matches[1].Trim()
    $fechaValorTexto = ($Matches[2] -replace '\s+', ' ').Trim()
}

# 3. Extracción opcional de otras divisas (Euro, Yuan, Lira, Rublo)
$otrasDivisas = @{}
$currencies = @("euro", "yuan", "lira", "rublo")
foreach ($curr in $currencies) {
    if ($html -match "id=""$curr""[\s\S]*?<strong[^>]*>\s*([0-9.,]+)\s*</strong>") {
        $raw = $Matches[1].Trim()
        $clean = $raw.Replace(".", "").Replace(",", ".")
        $otrasDivisas[$curr] = [math]::Round([double]$clean, 4)
    }
}

# 4. Formateo de datos
$nowIso = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz")
$usdFormatted = [string]::Format((New-Object System.Globalization.CultureInfo("es-VE")), "{0:N2}", $usdValue)

$data = [ordered]@{
    usd             = [math]::Round($usdValue, 4)
    usd_raw         = $usdRaw
    usd_formatted   = $usdFormatted
    fecha_valor     = $fechaValorTexto
    fecha_valor_iso = $fechaValorIso
    ultima_consulta = $nowIso
    fuente          = "Banco Central de Venezuela (https://www.bcv.org.ve/)"
    otras_divisas   = $otrasDivisas
}

# 5. Guardar en JSON (sobrescribe / actualiza in-place)
$jsonPath = Join-Path $OutputDir "bcv_rates.json"
$jsonContent = $data | ConvertTo-Json -Depth 4
[System.IO.File]::WriteAllText($jsonPath, $jsonContent, [System.Text.Encoding]::UTF8)

# 6. Guardar en archivo .env
$envPath = Join-Path $OutputDir ".env"
$envLines = @(
    "# Variables de entorno actualizadas por script BCV",
    "BCV_USD_RATE=$($data.usd)",
    "BCV_USD_RAW=$($data.usd_raw)",
    "BCV_FECHA_VALOR=""$($data.fecha_valor)""",
    "BCV_FECHA_VALOR_ISO=""$($data.fecha_valor_iso)""",
    "BCV_LAST_UPDATED=""$($data.ultima_consulta)"""
)
[System.IO.File]::WriteAllLines($envPath, $envLines, [System.Text.Encoding]::UTF8)

Write-Host "[$nowIso] Archivos actualizados exitosamente:" -ForegroundColor Green
Write-Host "  -> JSON: $jsonPath" -ForegroundColor White
Write-Host "  -> .ENV: $envPath" -ForegroundColor White
Write-Host "  -> Dolar Oficial: $($data.usd) Bs. (Raw: $($data.usd_raw)) | Fecha Valor: $($data.fecha_valor)" -ForegroundColor Yellow
