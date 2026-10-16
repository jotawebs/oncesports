# Walkthrough: Versión Móvil Optimizada y Experiencia Táctil Once Sports

## 📱 Mejoras Implementadas para Celular

### 1. Barra de Navegación y Encabezado Táctil
- **Altura compacta de 58px**: Ahorra espacio vertical para priorizar el catálogo de productos.
- **Logotipo e Identidad de Marca**: Se integró el imagotipo circular junto con la tipografía oficial `ONCE SPORTS`.
- **Botón de Pedido Táctil**: Pastilla con animación *bump* y contador en tiempo real.
- **Efecto Glassmorphism**: Fondo translúcido con desenfoque (`backdrop-filter: blur(12px)`) para un efecto moderno al scrollear.

---

### 2. Hero Section Compacta y Directa
- **Eliminación de espacios muertos**: Altura adaptativa (`min-height: auto`) y espaciado proporcional en pantallas de teléfono.
- **Tipografía Escalable**: Título principal fluido (`clamp(40px, 11vw, 64px)`) para evitar saltos de línea bruscos.
- **Botón de acción rápida**: Lleva al usuario directamente al catálogo con desplazamiento suave.

---

### 3. Barra de Búsqueda y Categorías Fija (Sticky Toolbar)
- **Siempre accesible mientras scrolleas**: Al deslizar la página hacia abajo, la barra de búsqueda y las categorías permanecen ancladas justo debajo del encabezado.
- **Chips de categoría deslizables (Horizontal Scroll Snap)**: Píldoras redondeadas con soporte táctil nativo sin barras de scroll invasivas.
- **Prevención de Zoom en iOS Safari**: Tamaño de fuente de `16px` en el campo de búsqueda para evitar que los iPhone hagan zoom automático molesto al enfocar el teclado.

---

### 4. Cuadrícula de Productos en 2 Columnas (Estilo E-commerce Moderno)
- **Grid de 2 columnas balanceado**: Formato estilo Nike / Gymshark / Zara para explorar más suplementos con menos scroll vertical.
- **Galería Deslizable con Snap Táctil**:
  - Deslizamiento suave con el pulgar (`scroll-snap-type: x mandatory`).
  - Indicador numérico discreto (`1 / 3`) y puntos (*dots*) de paginación.
  - Se ocultaron las flechas de escritorio en pantallas táctiles para no tapar los productos.
- **Alineación Visual Perfecta**: Títulos limitados a 2 líneas (`-webkit-line-clamp: 2`) y especificaciones a 1 línea con puntos suspensivos para que todas las tarjetas mantengan la misma altura.
- **Botones con Retroalimentación Háptica / Táctil**: Altura mínima de 36px, efecto `:active { transform: scale(0.96) }` y cambio instantáneo a `✓ ¡Agregado!`.

---

### 5. Barra Inferior Flotante de Pedido Rápido (*Floating Mobile Cart Bar*)
- Al agregar cualquier producto, aparece una barra flotante en la parte inferior de la pantalla:
  - **Indicador**: `[ 🛒 X items · Total: $XX.00 | Ver pedido ↗ ]`
  - **Fácil alcance con el pulgar**: Ubicada en la zona ergonómica del teléfono, respetando el área segura de iPhone (`env(safe-area-inset-bottom)`).
  - **Permite seguir scrolleando**: En celular ya no interrumpe la navegación abriendo modales de pantalla completa cada vez que agregas algo; puedes continuar explorando y abrir el pedido cuando estés listo con un solo toque.

---

### 6. Cajón de Pedido tipo *Bottom Sheet* Nativo
- En celular, el pedido se despliega desde abajo hacia arriba con esquinas redondeadas (`20px 20px 0 0`) y barra de arrastre (*drag handle*).
- Controles de cantidad agrandados (32px × 32px) para evitar toques accidentales.
- Botón de WhatsApp destacado (48px de altura) en verde corporativo para enviar el pedido en un clic.

---

### 7. Barra Negra con Tasa BCV y Movimiento en Bucle Infinito (*Marquee*)
- **Nuevo contenido integrado**: Se añadió `A TASA BCV` y `PAGOS A TASA BCV`, destacándose en color celeste de la marca junto a `100% ORIGINAL`, `DELIVERY EN VALENCIA`, `DECIDE CON INTELIGENCIA` y `MARCAS GARANTIZADAS`.
- **Movimiento horizontal continuo**: Animación CSS lineal ininterrumpida (`@keyframes ticker-slide` de 0 a -50%) con duplicación simétrica que garantiza un bucle 100% fluido y sin saltos o parpadeos.
- **Pausa interactiva**: Al posar el cursor o interactuar, el movimiento se pausa suavemente para facilitar la lectura.

---

### 8. Crédito "by jotawebs" en Información de Contacto
- **Sección de Contacto (Pie de Página)**: Se añadió `by jotawebs` en el bloque de contacto junto a la ubicación (Valencia, Carabobo).
- **Línea de Derechos Inferior**: Se incorporó `by jotawebs` resaltado en el color celeste insignia entre los enlaces de WhatsApp, Instagram y copyright.
