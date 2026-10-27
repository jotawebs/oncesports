# Sistema Automatizado de Tasa Oficial BCV — Once Sports

Este módulo automatiza la consulta y sincronización de la tasa oficial de cambio del **Banco Central de Venezuela (BCV)** para el catálogo web de Once Sports.

## ¿Cómo Funciona?

1. **Scraping Seguro de BCV (`update_bcv_rate.ps1`):**
   - Se conecta de forma directa a `https://www.bcv.org.ve/`.
   - Extrae el valor oficial del Dólar (USD) y la fecha valor oficial.
   - Genera el archivo `bcv_rates.json` con la tasa, fecha valor e histórico de consulta.
   - Exporta variables de entorno a `.env` (`BCV_USD_RATE`, etc.).

2. **Integración en la Web (`app.js` e `index.html`):**
   - El catálogo web consulta automáticamente `bcv_rates.json` al cargar.
   - En el carrito de compra y barra móvil, los precios en dólares se multiplican en tiempo real por la tasa oficial del BCV.
   - Se muestra el total tanto en dólares ($ USD) como en bolívares (Bs.).
   - Al hacer clic en "Enviar pedido por WhatsApp", el mensaje generado incluye automáticamente el desglose completo en divisas ($) y en bolívares (Bs. a tasa BCV).

3. **Ejecución Automatizada:**
   - Puede ejecutarse localmente con `run_update.bat` o el sidecar programado de Antigravity (`CRON_TZ=America/Caracas 0 9 * * *`).
   - GitHub Actions (`.github/workflows/update-bcv.yml`) mantiene actualizada la tasa en GitHub Pages.
