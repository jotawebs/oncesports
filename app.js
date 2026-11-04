const CONFIG = {
  WHATSAPP_PHONE: '584223581111', // Número directo para chat y pedidos
  INSTAGRAM_URL: 'https://instagram.com/oncesportsvzla'
};

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4Df3wysyKpCUiB23CxEYupxwish5q748fLA8z0jum50XyLvvRX7KrjvzwtH6QK9mgCFHLnCjWxYle/pub?gid=1&single=true&output=csv';

let PRODUCTS = [];

/**
 * Parser ligero para dividir texto CSV por comas (split(',')),
 * preservando valores que contienen comas dentro de comillas (ej. "$30,00").
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result.map((col) => col.replace(/^["']|["']$/g, '').trim());
}

/**
 * Normaliza y convierte textos de precio como "$30,00" o "30.00" a número.
 */
function parsePrice(value) {
  if (value == null || value === '') return null;
  const clean = String(value).replace(/["$\s]/g, '').replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? null : num;
}

/**
 * Construye la ruta de la imagen asumiendo que están en la carpeta ./assets/productos/
 * + el nombre que viene en la columna Nombre_Archivo_Foto.
 * Si ya viene como ruta relativa completa (ej: ./public/products/...) o URL remota, la respeta.
 */
function construirRutaFoto(nombreArchivo) {
  if (!nombreArchivo) return './public/logo.png';
  const clean = String(nombreArchivo).trim().replace(/^["']|["']$/g, '');
  if (!clean) return './public/logo.png';

  // Si ya tiene prefijo ./ o / o protocolo http/https
  if (clean.startsWith('./') || clean.startsWith('/') || clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  // Asume la carpeta ./assets/productos/ + el nombre de la columna
  return `./assets/productos/${clean}`;
}

/**
 * Carga el catálogo de productos dinámicamente desde Google Sheets CSV.
 */
async function cargarProductos() {
  const grid = $('#product-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="catalog-loading">
        <span class="loading-spinner" aria-hidden="true"></span>
        <p>Cargando inventario oficial en vivo...</p>
      </div>`;
  }

  try {
    // Cache-busting con timestamp para forzar lectura fresca (vital para navegadores como Instagram WebView)
    const urlSinCache = `${SHEET_CSV_URL}&t=${new Date().getTime()}`;
    const response = await fetch(urlSinCache, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Error al obtener inventario CSV`);
    }

    const csvText = await response.text();
    const rawLines = csvText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

    // Identificar la fila de encabezados para ignorarla correctamente
    // Columnas esperadas: ID_SKU, Categoria, Nombre_Producto, Descripcion_Corta,
    // Precio_USD, Precio_Oferta_USD, Variantes_Opciones, Estado_Stock, Nombre_Archivo_Foto, Destacado
    let headerIndex = rawLines.findIndex((l) => l.toUpperCase().includes('ID_SKU'));
    if (headerIndex === -1) headerIndex = 0;

    const dataLines = rawLines.slice(headerIndex + 1);

    const KNOWN_BRANDS = [
      'Optimum Nutrition',
      'MuscleTech',
      'Nutrex Research',
      'Rule One Proteins',
      'AllMax Nutrition',
      'Nutrex',
      'Rule One',
      'AllMax',
      'Hydroxycut'
    ];

    PRODUCTS = dataLines
      .map((line) => {
        const cols = parseCSVLine(line);
        if (!cols || cols.length < 5) return null;

        const [
          idSku,
          categoria,
          nombreProducto,
          descripcionCorta,
          precioUsdRaw,
          precioOfertaRaw,
          variantesOpciones,
          estadoStock,
          nombreArchivoFoto,
          destacado
        ] = cols;

        if (!idSku && !nombreProducto) return null;

        const regularPrice = parsePrice(precioUsdRaw);
        const offerPrice = parsePrice(precioOfertaRaw);
        const effectivePrice = offerPrice !== null ? offerPrice : regularPrice;
        const isAgotado = String(estadoStock || '').trim().toLowerCase() === 'agotado';

        // Detección de marca inteligente para filtros
        let brand = 'Once Sports';
        let cleanName = (nombreProducto || idSku).trim();
        for (const b of KNOWN_BRANDS) {
          if (cleanName.toLowerCase().startsWith(b.toLowerCase())) {
            brand = b;
            const rest = cleanName.slice(b.length).trim();
            if (rest) cleanName = rest;
            break;
          }
        }

        const rawFotos = (nombreArchivoFoto || '').split(/[;|]/).map((s) => s.trim()).filter(Boolean);
        const images = rawFotos.length > 0 ? rawFotos.map(construirRutaFoto) : [construirRutaFoto(nombreArchivoFoto)];

        return {
          id: (idSku || `PROD-${Math.random().toString(36).substr(2, 7)}`).trim(),
          sku: idSku ? idSku.trim() : '',
          brand,
          fullName: nombreProducto || '',
          name: cleanName,
          category: (categoria || 'General').trim(),
          spec: (descripcionCorta || '').trim(),
          price: effectivePrice,
          regularPrice,
          offerPrice,
          variants: (variantesOpciones || '').trim(),
          stockStatus: (estadoStock || 'Disponible').trim(),
          available: !isAgotado,
          isAgotado,
          featured: String(destacado || '').trim().toUpperCase() === 'SI',
          images
        };
      })
      .filter(Boolean);

    // Actualiza filtros, catálogo y pedido
    setupFilters();
    renderProducts();
    renderCart();

    const statusEl = document.querySelector('.catalog-status');
    if (statusEl) {
      statusEl.innerHTML = `<i></i> Inventario en vivo (${PRODUCTS.length} productos)`;
    }
  } catch (error) {
    console.error('Error cargando inventario desde Google Sheets:', error);
    if (grid) {
      grid.innerHTML = `
        <div class="empty-state">
          <strong>No pudimos cargar el inventario en vivo.</strong>
          <span>Verifica tu conexión a internet o intenta nuevamente en unos momentos.</span>
        </div>`;
    }
  }
}

const CART_KEY = 'once-sports-cart-v1';
const ZONE_KEY = 'once-sports-zone-v1';

// Almacenamiento seguro compatible con file://, iframes y modos privados
const memoryStore = {};
const safeStore = {
  get(key) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : (memoryStore[key] || null);
    } catch {
      return memoryStore[key] || null;
    }
  },
  set(key, val) {
    memoryStore[key] = String(val);
    try {
      localStorage.setItem(key, String(val));
    } catch {
      // almacenamiento en memoria activo
    }
  }
};

function loadJson(key, fallback) {
  try {
    const raw = safeStore.get(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch {
    return fallback;
  }
}

let cart = loadJson(CART_KEY, {});
let activeCategory = 'all';
let query = '';

let bcvRate = 888.1183;
let bcvFormattedRate = '888,12';
let bcvDate = 'Miércoles, 28 Octubre 2026';

const $ = (selector) => document.querySelector(selector);
const money = (value) => (value == null ? 'Por confirmar' : `$${Number(value).toFixed(2)}`);
const moneyBs = (value) => {
  if (value == null || isNaN(value)) return 'Bs. —';
  return 'Bs. ' + Number(value).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

async function loadBcvRate() {
  try {
    const res = await fetch('./bcv_rates.json?v=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.usd) {
        bcvRate = Number(data.usd);
        bcvFormattedRate = data.usd_formatted || data.usd.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        bcvDate = data.fecha_valor || '';
        updateBcvDisplays();
        renderCart();
      }
    }
  } catch (err) {
    console.warn('Usando tasa BCV por defecto:', err);
  }
}

function updateBcvDisplays() {
  const noteEl = $('#bcv-rate-note');
  if (noteEl) {
    noteEl.textContent = `Tasa BCV: Bs. ${bcvFormattedRate}`;
    if (bcvDate) noteEl.title = `Fecha Valor BCV: ${bcvDate}`;
  }
}

const normalize = (value) =>
  String(value || '')
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function saveState() {
  safeStore.set(CART_KEY, JSON.stringify(cart));
  const zoneVal = $('#delivery-zone')?.value || '';
  safeStore.set(ZONE_KEY, zoneVal);
}

function getProduct(id) {
  if (!id) return null;
  return PRODUCTS.find(
    (product) =>
      product.id === id ||
      product.sku === id ||
      String(product.id).toLowerCase() === String(id).toLowerCase() ||
      product.fullName?.toLowerCase() === String(id).toLowerCase()
  );
}

function categories() {
  return ['all', ...new Set(PRODUCTS.map((product) => product.category))];
}

function formatCategory(category) {
  return category === 'all' ? 'Todos' : category;
}

function setupFilters() {
  const container = $('#category-filters');
  if (container) {
    container.innerHTML = categories()
      .map((category) => `<button class="filter-button ${category === activeCategory ? 'active' : ''}" type="button" data-category="${category}">${formatCategory(category)}</button>`)
      .join('');
    container.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      activeCategory = button.dataset.category;
      document.querySelectorAll('.filter-button').forEach((item) => item.classList.toggle('active', item === button));
      renderProducts();
    });
  }

  const brandFilter = $('#brand-filter');
  if (brandFilter) {
    const brands = [...new Set(PRODUCTS.map((product) => product.brand))].sort((a, b) => a.localeCompare(b));
    brandFilter.innerHTML = '<option value="all">Todas</option>' + brands.map((brand) => `<option value="${brand}">${brand}</option>`).join('');
  }
}

function filteredProducts() {
  const brandSelect = $('#brand-filter');
  const selectedBrand = brandSelect ? brandSelect.value : 'all';
  return PRODUCTS.filter((product) => {
    const text = normalize(`${product.name} ${product.brand} ${product.category}`);
    return (
      (activeCategory === 'all' || product.category === activeCategory) &&
      (selectedBrand === 'all' || product.brand === selectedBrand) &&
      (!query || text.includes(normalize(query)))
    );
  });
}

function renderProducts() {
  const grid = $('#product-grid');
  if (!grid) return;
  const products = filteredProducts();
  const countEl = $('#result-count');
  if (countEl) countEl.textContent = `${products.length} ${products.length === 1 ? 'producto' : 'productos'} disponibles`;
  const emptyEl = $('#empty-state');
  if (emptyEl) emptyEl.hidden = products.length > 0;

  grid.innerHTML = products
    .map((product) => {
      const images = product.images && product.images.length > 0 ? product.images : ['./public/logo.png'];
      const isAgotado = product.isAgotado;

      return `
    <article class="product-card ${isAgotado ? 'agotado is-out-of-stock' : ''}" data-card-id="${product.id}">
      <div class="product-gallery">
        ${isAgotado ? '<span class="stock-badge stock-badge-agotado">Agotado</span>' : ''}
        ${product.offerPrice && !isAgotado ? '<span class="stock-badge stock-badge-oferta">Oferta</span>' : ''}
        <div class="gallery-scroll" data-scroll-id="${product.id}" tabindex="0" aria-label="Fotos de ${product.name}">
          ${images
            .map(
              (img, idx) => `
            <div class="gallery-slide">
              <img src="${img}" alt="${product.name} - Vista ${idx + 1}" loading="lazy" onerror="this.onerror=null; this.src='./public/logo.png';" />
            </div>
          `
            )
            .join('')}
        </div>
        ${
          images.length > 1
            ? `
          <button class="gallery-nav prev" type="button" aria-label="Foto anterior" data-nav="prev" data-id="${product.id}">‹</button>
          <button class="gallery-nav next" type="button" aria-label="Foto siguiente" data-nav="next" data-id="${product.id}">›</button>
          <div class="gallery-dots" data-dots-id="${product.id}">
            ${images.map((_, idx) => `<span class="gallery-dot ${idx === 0 ? 'active' : ''}" data-idx="${idx}" data-id="${product.id}" title="Ver foto ${idx + 1}"></span>`).join('')}
          </div>
          <span class="gallery-badge" data-badge-id="${product.id}">1 / ${images.length}</span>
        `
            : ''
        }
      </div>
      <div class="product-card-body">
        <div class="product-brand">${product.brand}</div>
        <h3>${product.name}</h3>
        <div class="product-spec">${product.spec}</div>
        <div class="price-block">
          ${
            product.offerPrice
              ? `<div class="price has-offer">
                  <label>Precio</label>
                  <div class="price-row">
                    <strong>${money(product.offerPrice)}</strong>
                    <del class="old-price">${money(product.regularPrice)}</del>
                  </div>
                 </div>`
              : `<div class="price ${product.price == null ? 'pending' : ''}">
                  <label>Precio</label>
                  <strong>${money(product.price)}</strong>
                 </div>`
          }
        </div>
        <button
          class="add-button"
          type="button"
          data-add="${product.id}"
          ${isAgotado ? 'disabled aria-disabled="true"' : ''}
        >
          ${isAgotado ? 'Agotado ✕' : 'Agregar al pedido ＋'}
        </button>
      </div>
    </article>
  `;
    })
    .join('');

  setupGalleryListeners();

  grid.querySelectorAll('[data-add]:not([disabled])').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.add;
      addToCart(id);
      button.classList.add('added');
      const originalText = button.innerHTML;
      button.innerHTML = '✓ ¡Agregado!';
      setTimeout(() => {
        button.classList.remove('added');
        button.innerHTML = originalText;
      }, 1100);
    });
  });
}

function setupGalleryListeners() {
  document.querySelectorAll('.gallery-scroll').forEach((slider) => {
    const id = slider.dataset.scrollId;
    const dotsContainer = document.querySelector(`.gallery-dots[data-dots-id="${id}"]`);
    const badge = document.querySelector(`.gallery-badge[data-badge-id="${id}"]`);
    if (!dotsContainer) return;

    slider.addEventListener(
      'scroll',
      () => {
        const width = slider.clientWidth || 1;
        const index = Math.round(slider.scrollLeft / width);
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
        if (badge) badge.textContent = `${index + 1} / ${dots.length}`;
      },
      { passive: true }
    );
  });

  document.querySelectorAll('.gallery-nav').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const dir = btn.dataset.nav;
      const slider = document.querySelector(`.gallery-scroll[data-scroll-id="${id}"]`);
      if (!slider) return;
      const width = slider.clientWidth;
      slider.scrollBy({ left: dir === 'next' ? width : -width, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.gallery-dot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = dot.dataset.id;
      const idx = Number(dot.dataset.idx) || 0;
      const slider = document.querySelector(`.gallery-scroll[data-scroll-id="${id}"]`);
      if (!slider) return;
      const width = slider.clientWidth;
      slider.scrollTo({ left: idx * width, behavior: 'smooth' });
    });
  });
}

function addToCart(id) {
  const product = getProduct(id);
  if (!product || product.isAgotado || !product.available) return;
  cart[id] = (Number(cart[id]) || 0) + 1;
  saveState();
  renderCart();
  if (window.innerWidth >= 700) {
    openCart();
  }
  bumpCartBadge();
  showToast(`✓ ${product.name} agregado al pedido`);
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: getProduct(id), qty: Number(qty) || 0 }))
    .filter((entry) => entry.product && entry.qty > 0);
}

function bumpCartBadge() {
  const badge = $('#cart-count');
  if (badge) {
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, entry) => sum + entry.qty, 0);

  const countBadge = $('#cart-count');
  if (countBadge) countBadge.textContent = count;

  const countTitle = $('#cart-count-title');
  if (countTitle) countTitle.textContent = `(${count})`;

  const itemsContainer = $('#cart-items');
  if (itemsContainer) {
    if (!entries.length) {
      itemsContainer.innerHTML = `
        <div class="cart-empty">
          <span class="cart-empty-mark">＋</span>
          <p>Tu pedido está vacío.</p>
          <small>Agrega productos del catálogo para comenzar.</small>
        </div>`;
    } else {
      itemsContainer.innerHTML = entries
        .map(
          ({ product, qty }) => `
        <div class="cart-line" data-line-id="${product.id}">
          <img src="${product.images && product.images[0] ? product.images[0] : './public/logo.png'}" class="cart-line-thumb" alt="${product.name}" />
          <div class="cart-line-info">
            <h3>${product.name}</h3>
            <p>${product.brand} · ${product.spec}</p>
            <div class="qty-control">
              <button type="button" data-decrease="${product.id}" aria-label="Restar una unidad">−</button>
              <span class="qty-num">${qty}</span>
              <button type="button" data-increase="${product.id}" aria-label="Sumar una unidad">＋</button>
            </div>
            <button class="remove-line" type="button" data-remove="${product.id}">Eliminar</button>
          </div>
          <div class="cart-line-price">
            <strong>${product.price == null ? '—' : money(product.price * qty)}</strong>
            ${product.price != null && bcvRate ? `<small class="cart-line-bs">${moneyBs(product.price * qty * bcvRate)}</small>` : ''}
          </div>
        </div>
      `
        )
        .join('');

      itemsContainer.querySelectorAll('[data-increase]').forEach((button) => {
        button.addEventListener('click', () => updateQty(button.dataset.increase, 1));
      });
      itemsContainer.querySelectorAll('[data-decrease]').forEach((button) => {
        button.addEventListener('click', () => updateQty(button.dataset.decrease, -1));
      });
      itemsContainer.querySelectorAll('[data-remove]').forEach((button) => {
        button.addEventListener('click', () => removeFromCart(button.dataset.remove));
      });
    }
  }

  const totalPrice = entries.reduce((sum, { product, qty }) => sum + (product.price || 0) * qty, 0);
  const totalBs = totalPrice * (bcvRate || 1);

  const totalEl = $('#total-divisa');
  if (totalEl) totalEl.textContent = money(totalPrice);

  const totalBsEl = $('#total-bs');
  if (totalBsEl) totalBsEl.textContent = moneyBs(totalBs);

  const mobileBar = $('#mobile-cart-bar');
  const mcbCount = $('#mcb-count');
  const mcbTotal = $('#mcb-total');
  const mcbTotalBs = $('#mcb-total-bs');
  if (mobileBar) {
    if (count > 0) {
      mobileBar.hidden = false;
      if (mcbCount) mcbCount.textContent = count;
      if (mcbTotal) mcbTotal.textContent = money(totalPrice);
      if (mcbTotalBs) mcbTotalBs.textContent = moneyBs(totalBs);
    } else {
      mobileBar.hidden = true;
    }
  }

  updateWhatsAppLinks(entries, totalPrice);
}

function updateQty(id, delta) {
  const current = Number(cart[id]) || 0;
  const updated = current + delta;
  if (updated <= 0) {
    delete cart[id];
  } else {
    cart[id] = updated;
  }
  saveState();
  renderCart();
  bumpCartBadge();
}

function removeFromCart(id) {
  delete cart[id];
  saveState();
  renderCart();
  bumpCartBadge();
  showToast('Producto eliminado del pedido');
}

function openCart() {
  const toast = $('#toast');
  if (toast) {
    toast.classList.remove('show');
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
  }
  const overlay = $('#cart-overlay');
  const panel = $('#cart-panel');
  if (overlay) overlay.hidden = false;
  if (panel) {
    requestAnimationFrame(() => panel.classList.add('open'));
    panel.setAttribute('aria-hidden', 'false');
  }
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const overlay = $('#cart-overlay');
  const panel = $('#cart-panel');
  if (panel) {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
  setTimeout(() => {
    if (overlay) overlay.hidden = true;
  }, 250);
}

let toastTimeoutId = null;
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }
  toastTimeoutId = setTimeout(() => {
    toast.classList.remove('show');
    toastTimeoutId = null;
  }, 2200);
}

function buildOrderText(entries, totalPrice, zone) {
  const totalBs = totalPrice * (bcvRate || 1);
  const formattedUsd = money(totalPrice);
  const formattedBs = moneyBs(totalBs);
  const bcvDisplay = bcvRate ? ` (Tasa oficial BCV: ${bcvFormattedRate || bcvRate.toFixed(2).replace('.', ',')} Bs.)` : '';

  const lines = entries.map(({ product, qty }) => {
    const subUsd = product.price ? ` — ${money(product.price * qty)}` : '';
    const subBs = product.price && bcvRate ? ` (${moneyBs(product.price * qty * bcvRate)})` : '';
    return `• ${qty} x ${product.brand} ${product.name} (${product.spec})${subUsd}${subBs}`;
  });

  return [
    '¡Hola Once Sports! Quiero preparar este pedido:',
    '',
    ...lines,
    '',
    `💵 Total en divisas: ${formattedUsd}`,
    `🇻🇪 Total en bolívares${bcvDisplay}: ${formattedBs}`,
    `📍 Zona o dirección de entrega: ${zone || 'Por coordinar por chat (Valencia)'}`,
    bcvDate ? `ℹ️ Fecha valor BCV: ${bcvDate}` : '',
    '',
    'Quedo atento/a para coordinar disponibilidad y delivery.'
  ].filter(Boolean).join('\n');
}

function updateWhatsAppLinks(entries, totalPrice) {
  const zone = $('#delivery-zone')?.value?.trim() || '';
  const text = buildOrderText(entries, totalPrice, zone);
  const directLink = $('#direct-wa-link');
  if (directLink) {
    directLink.href = `https://api.whatsapp.com/send?phone=${CONFIG.WHATSAPP_PHONE}&text=${encodeURIComponent(text)}`;
  }
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Intentar fallback
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const success = document.execCommand('copy');
    document.body.removeChild(ta);
    return success;
  } catch {
    return false;
  }
}

function openSafeUrl(url) {
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
}

async function sendToWhatsApp() {
  const entries = cartEntries();
  if (!entries.length) {
    showToast('Tu pedido está vacío. Elige un producto del catálogo');
    openCart();
    return;
  }

  const zone = $('#delivery-zone')?.value?.trim() || 'Valencia (por coordinar)';
  const totalPrice = entries.reduce((sum, { product, qty }) => sum + (product.price || 0) * qty, 0);
  const orderMessage = buildOrderText(entries, totalPrice, zone);

  await copyToClipboard(orderMessage);
  showToast('✓ ¡Pedido copiado! Abriendo WhatsApp de Once Sports...');

  const targetUrl = `https://api.whatsapp.com/send?phone=${CONFIG.WHATSAPP_PHONE}&text=${encodeURIComponent(orderMessage)}`;

  setTimeout(() => {
    openSafeUrl(targetUrl);
  }, 400);
}

async function init() {
  setupFilters();

  const searchInput = $('#search');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      query = event.target.value;
      renderProducts();
    });
  }

  const brandFilter = $('#brand-filter');
  if (brandFilter) {
    brandFilter.addEventListener('change', renderProducts);
  }

  const openCartBtn = $('#open-cart');
  if (openCartBtn) openCartBtn.addEventListener('click', openCart);

  const mcbBtn = $('#mcb-open-cart');
  if (mcbBtn) mcbBtn.addEventListener('click', openCart);

  const mcbBar = $('#mobile-cart-bar');
  if (mcbBar) {
    mcbBar.addEventListener('click', (e) => {
      // Open cart unless clicked directly on mcb-open-cart which also triggers openCart
      openCart();
    });
  }

  const closeCartBtn = $('#close-cart');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

  const cartOverlay = $('#cart-overlay');
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  const toastEl = $('#toast');
  if (toastEl) {
    toastEl.addEventListener('click', () => {
      toastEl.classList.remove('show');
      if (toastTimeoutId) clearTimeout(toastTimeoutId);
    });
  }

  const sendBtn = $('#send-whatsapp');
  if (sendBtn) sendBtn.addEventListener('click', sendToWhatsApp);

  const zoneInput = $('#delivery-zone');
  if (zoneInput) {
    zoneInput.value = safeStore.get(ZONE_KEY) || '';
    zoneInput.addEventListener('input', () => {
      saveState();
      const entries = cartEntries();
      const totalPrice = entries.reduce((sum, { product, qty }) => sum + (product.price || 0) * qty, 0);
      updateWhatsAppLinks(entries, totalPrice);
    });
  }

  renderCart();
  loadBcvRate();
  await cargarProductos();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
