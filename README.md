# Once Sports

Sitio mobile-first para preparar pedidos de suplementos deportivos y enviarlos por WhatsApp en Valencia, Carabobo.

## Actualizar el catálogo

Los productos y precios viven en `app.js`, dentro de `PRODUCTS`. Cada producto tiene marca, nombre, categoría, especificación, precio `divisa`, precio `bcv` y un indicador `available`. Cuando el catálogo de WhatsApp vuelva a estar disponible, reemplaza los datos pendientes y agrega las fotos locales en `public/`.

## Desarrollo local

```bash
pnpm start
```

El servidor escucha en `http://localhost:3000`.

## Publicación

El proyecto está preparado como sitio estático. En la plataforma de publicación, usa la carpeta raíz como salida porque `index.html`, `styles.css`, `app.js` y `public/` ya contienen el sitio completo. Para conectar un dominio propio, publica la versión estable y añade el dominio desde la configuración de hosting; no es necesario cambiar el flujo de pedidos, que seguirá abriendo WhatsApp.

## Limitación actual

El enlace suministrado al catálogo de WhatsApp Business (`https://wa.me/c/171438619234556`) devolvió una página 404 durante la revisión. Por eso las cuatro creatinas con precios de respaldo están incluidas, mientras que los productos conocidos sin precio o foto verificados aparecen marcados como pendientes, sin inventar información.
