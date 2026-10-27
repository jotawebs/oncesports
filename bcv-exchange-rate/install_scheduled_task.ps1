<#
.SYNOPSIS
    Crea o actualiza una tarea programada en Windows para actualizar la tasa del BCV automáticamente a las 18:48.
#>

$taskName = "ActualizarTasaBCV"
$batPath = "C:\Users\carlo\.gemini\antigravity\scratch\bcv-exchange-rate\run_update.bat"

# Verifica si el archivo batch existe
if (-not (Test-Path $batPath)) {
    Write-Error "No se encontró el archivo $batPath"
    exit 1
}

# Crear la acción: ejecutar run_update.bat
$action = New-ScheduledTaskAction -Execute $batPath

# Disparador: Diariamente a las 18:48
$trigger = New-ScheduledTaskTrigger -Daily -At "18:48"

# Configuración adicional
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Registrar la tarea para el usuario actual
try {
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Actualiza diariamente el archivo bcv_rates.json con la tasa oficial de cambio del BCV a las 18:48." -Force | Out-Null
    Write-Host "Tarea programada '$taskName' registrada exitosamente." -ForegroundColor Green
    Write-Host "Horario: Todos los dias a las 18:48." -ForegroundColor Cyan
    Write-Host "Ejecuta: $batPath" -ForegroundColor White
}
catch {
    Write-Warning "Para registrar la tarea programada en Windows, ejecute PowerShell como Administrador o use el programador de tareas manual. Detalle: $_"
}
