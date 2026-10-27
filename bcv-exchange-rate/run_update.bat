@echo off
setlocal
cd /d "%~dp0"
powershell.exe -ExecutionPolicy Bypass -NoProfile -File "%~dp0update_bcv_rate.ps1"
exit /b %ERRORLEVEL%
