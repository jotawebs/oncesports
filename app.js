const CONFIG = {
  WHATSAPP_PHONE: '584223581111', // Número directo para chat y pedidos
  INSTAGRAM_URL: 'https://instagram.com/oncesportsvzla'
};

const PRODUCTS = [
  // ─── CREATINAS ───────────────────────────────────────────────
  {
    id: 'on-creatine',
    brand: 'Optimum Nutrition',
    name: 'Micronized Creatine Powder',
    category: 'Creatinas',
    spec: '300 g · 60 servicios · Unflavored',
    price: 30,
    code: 'ON',
    available: true,
    images: [
      './public/products/on-creatine/1.webp',
      './public/products/on-creatine/2.png'
    ]
  },
  {
    id: 'on-creatine-plus',
    brand: 'Optimum Nutrition',
    name: 'Creatine+ Enhanced 3-in-1',
    category: 'Creatinas',
    spec: '360 g · 40 servicios · Strawberry Peach',
    price: 30,
    code: 'ON+',
    available: true,
    images: [
      './public/products/on-creatine-plus/1.png'
    ]
  },
  {
    id: 'muscletech-celltech',
    brand: 'MuscleTech',
    name: 'Cell-Tech Creactor HCl',
    category: 'Creatinas',
    spec: '120 servicios',
    price: 40,
    code: 'M',
    available: true,
    images: [
      './public/products/muscletech-celltech/1.png',
      './public/products/muscletech-celltech/2.png',
      './public/products/muscletech-celltech/3.png'
    ]
  },
  {
    id: 'nutrex-creatine-60',
    brand: 'Nutrex Research',
    name: 'Creatine Monohydrate',
    category: 'Creatinas',
    spec: '300 g · 60 servicios · Unflavored',
    price: 25,
    code: 'N',
    available: true,
    images: [
      './public/products/nutrex-creatine-60/1.png',
      './public/products/nutrex-creatine-60/2.png',
      './public/products/nutrex-creatine-60/3.png'
    ]
  },
  {
    id: 'nutrex-creatine',
    brand: 'Nutrex Research',
    name: 'Creatine Monohydrate',
    category: 'Creatinas',
    spec: '1000 g · 200 servicios',
    price: 49.99,
    code: 'N',
    available: true,
    images: [
      './public/products/nutrex-creatine/1.png',
      './public/products/nutrex-creatine/2.png',
      './public/products/nutrex-creatine/3.png'
    ]
  },
  {
    id: 'rule-one-creatine',
    brand: 'Rule One Proteins',
    name: 'Creatine 100% Pure',
    category: 'Creatinas',
    spec: '150 g · 30 servicios · Unflavored',
    price: 25,
    code: 'R1',
    available: true,
    images: [
      './public/products/rule-one-creatine/1.png',
      './public/products/rule-one-creatine/2.png',
      './public/products/rule-one-creatine/3.png'
    ]
  },
  {
    id: 'allmax-creatine',
    brand: 'AllMax Nutrition',
    name: 'Creatine Monohydrate Micronized',
    category: 'Creatinas',
    spec: '400 g · 80 servicios',
    price: 35,
    code: 'A',
    available: true,
    images: [
      './public/products/allmax-creatine/1.jpg',
      './public/products/allmax-creatine/2.jpg',
      './public/products/allmax-creatine/3.jpg'
    ]
  },

  // ─── GLUTAMINAS ──────────────────────────────────────────────
  {
    id: 'glutamine',
    brand: 'Nutrex Research',
    name: 'Glutamine Drive 100% Pure',
    category: 'Glutaminas',
    spec: '300 g · 60 servicios',
    price: 25,
    code: 'N',
    available: true,
    images: [
      './public/products/glutamine/1.png',
      './public/products/glutamine/2.png',
      './public/products/glutamine/3.png'
    ]
  },
  {
    id: 'rule-one-glutamine',
    brand: 'Rule One Proteins',
    name: 'Glutamine 100% Pure',
    category: 'Glutaminas',
    spec: '375 g · 75 servicios · Unflavored',
    price: 25,
    code: 'R1',
    available: true,
    images: [
      './public/products/rule-one-glutamine/1.png',
      './public/products/rule-one-glutamine/2.png',
      './public/products/rule-one-glutamine/3.png'
    ]
  },

  // ─── BCAA ────────────────────────────────────────────────────
  {
    id: 'allmax-bcaa',
    brand: 'AllMax Nutrition',
    name: 'BCAA 2:1:1 Fermented',
    category: 'Aminoácidos y BCAA',
    spec: '400 g · 80 servicios · 100% Puro',
    price: 35,
    code: 'A',
    available: true,
    images: [
      './public/products/allmax-bcaa/1.jpg',
      './public/products/allmax-bcaa/2.jpg',
      './public/products/allmax-bcaa/3.jpg'
    ]
  },
  {
    id: 'rule-one-active-bcaa',
    brand: 'Rule One Proteins',
    name: 'Active BCAA + Electrolytes',
    category: 'Aminoácidos y BCAA',
    spec: '30 servicios · Blue Raspberry',
    price: 25,
    code: 'R1',
    available: true,
    images: [
      './public/products/rule-one-active-bcaa/1.png',
      './public/products/rule-one-active-bcaa/2.png',
      './public/products/rule-one-active-bcaa/3.png'
    ]
  },
  {
    id: 'nutrex-amino',
    brand: 'Nutrex Research',
    name: 'BCAA Drive',
    category: 'Aminoácidos y BCAA',
    spec: '30 servicios',
    price: 25,
    code: 'N',
    available: true,
    images: [
      './public/products/nutrex-amino/1.png',
      './public/products/nutrex-amino/2.png',
      './public/products/nutrex-amino/3.png'
    ]
  },
  {
    id: 'rule-one-amino',
    brand: 'Rule One Proteins',
    name: 'BCAA Fermented Amino',
    category: 'Aminoácidos y BCAA',
    spec: '30 servicios · Grape',
    price: 25,
    code: 'R1',
    available: true,
    images: [
      './public/products/rule-one-amino/1.png',
      './public/products/rule-one-amino/2.png',
      './public/products/rule-one-amino/3.png'
    ]
  },

  // ─── EAA ─────────────────────────────────────────────────────
  {
    id: 'eaa',
    brand: 'AllMax Nutrition',
    name: 'EAA Essential Amino Acids',
    category: 'Aminoácidos y BCAA',
    spec: '30 servicios · Espectro Completo',
    price: 30,
    code: 'A',
    available: true,
    images: [
      './public/products/eaa/1.jpg',
      './public/products/eaa/2.jpg',
      './public/products/eaa/3.jpg'
    ]
  },
  {
    id: 'nutrex-eaa',
    brand: 'Nutrex Research',
    name: 'EAA+ Hydration',
    category: 'Aminoácidos y BCAA',
    spec: '30 servicios · Hidratación y Recuperación',
    price: 35,
    code: 'N',
    available: true,
    images: [
      './public/products/nutrex-eaa/1.png',
      './public/products/nutrex-eaa/2.png',
      './public/products/nutrex-eaa/3.png'
    ]
  },

  // ─── QUEMADORES ──────────────────────────────────────────────
  {
    id: 'hydroxycut-women',
    brand: 'Hydroxycut',
    name: 'Max for Women',
    category: 'Quemadores',
    spec: '70 cápsulas · Pérdida de Peso Femenina',
    price: 50,
    code: 'H',
    available: true,
    images: [
      './public/products/hydroxycut-women/1.jpeg',
      './public/products/hydroxycut-women/2.png',
      './public/products/hydroxycut-women/3.jpg'
    ]
  },

  // ─── RENDIMIENTO Y SALUD ─────────────────────────────────────
  {
    id: 'allmax-citrulline',
    brand: 'AllMax Nutrition',
    name: 'Citrulline Malate 2:1',
    category: 'Rendimiento',
    spec: '300 g · Bombeo y Óxido Nítrico',
    price: 40,
    code: 'A',
    available: true,
    images: [
      './public/products/allmax-citrulline/1.jpeg',
      './public/products/allmax-citrulline/2.jpeg',
      './public/products/allmax-citrulline/3.jpeg'
    ]
  },
  {
    id: 'leucine',
    brand: 'AllMax Nutrition',
    name: 'Leucine Síntesis Proteica',
    category: 'Rendimiento',
    spec: '400 g · 100% Puro Grado Farmacéutico',
    price: 40,
    code: 'A',
    available: true,
    images: [
      './public/products/leucine/1.jpg',
      './public/products/leucine/2.jpg',
      './public/products/leucine/3.jpg'
    ]
  },
  {
    id: 'beta-alanine',
    brand: 'AllMax Nutrition',
    name: 'Beta Alanine Resistencia Muscular',
    category: 'Rendimiento',
    spec: '400 g · Rendimiento Máximo',
    price: 30,
    code: 'A',
    available: true,
    images: [
      './public/products/beta-alanine/1.jpg',
      './public/products/beta-alanine/2.jpg',
      './public/products/beta-alanine/3.jpg'
    ]
  },
  {
    id: 'arginine',
    brand: 'AllMax Nutrition',
    name: 'Arginine HCl Ultra Pure',
    category: 'Rendimiento',
    spec: '400 g · Vasodilatador y Bombeo',
    price: 40,
    code: 'A',
    available: true,
    images: [
      './public/products/arginine/1.jpg',
      './public/products/arginine/2.jpg',
      './public/products/arginine/3.jpg'
    ]
  },
  {
    id: 'allmax-tudca',
    brand: 'AllMax Nutrition',
    name: 'Tudca Liver Support',
    category: 'Rendimiento',
    spec: '60 cápsulas · Salud Hepática Avanzada',
    price: 55,
    code: 'A',
    available: true,
    images: [
      './public/products/allmax-tudca/1.jpeg',
      './public/products/allmax-tudca/2.jpeg',
      './public/products/allmax-tudca/3.jpeg'
    ]
  },
  {
    id: 'allmax-ksm66',
    brand: 'AllMax Nutrition',
    name: 'KSM-66 Ashwagandha',
    category: 'Rendimiento',
    spec: '60 cápsulas · Anti-estrés y Vitalidad',
    price: 25,
    code: 'A',
    available: true,
    images: [
      './public/products/allmax-ksm66/1.jpeg',
      './public/products/allmax-ksm66/2.jpeg',
      './public/products/allmax-ksm66/3.jpeg'
    ]
  },
  {
    id: 'collagen',
    brand: 'Rule One Proteins',
    name: 'Collagen Peptides Tipo I y III',
    category: 'Rendimiento',
    spec: '25 servicios · Sin Sabor',
    price: 30,
    code: 'R1',
    available: true,
    images: [
      './public/products/collagen/1.png',
      './public/products/collagen/2.png',
      './public/products/collagen/3.png'
    ]
  },
  {
    id: 'allmax-melatonin',
    brand: 'AllMax Nutrition',
    name: 'Melatonin Sueño y Recuperación',
    category: 'Rendimiento',
    spec: 'Cápsulas · Descanso Profundo',
    price: 15,
    code: 'A',
    available: true,
    images: [
      './public/products/allmax-melatonin/1.png',
      './public/products/allmax-melatonin/2.png'
    ]
  }
];

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

const $ = (selector) => document.querySelector(selector);
const money = (value) => (value == null ? 'Por confirmar' : `$${Number(value).toFixed(2)}`);
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
  return PRODUCTS.find((product) => product.id === id);
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
      return `
    <article class="product-card" data-card-id="${product.id}">
      <div class="product-gallery">
        <div class="gallery-scroll" data-scroll-id="${product.id}" tabindex="0" aria-label="Fotos de ${product.name}">
          ${images
            .map(
              (img, idx) => `
            <div class="gallery-slide">
              <img src="${img}" alt="${product.name} - Vista ${idx + 1}" loading="lazy" />
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
          <div class="price ${product.price == null ? 'pending' : ''}"><label>Precio</label><strong>${money(product.price)}</strong></div>
        </div>
        <button class="add-button" type="button" data-add="${product.id}">
          ${product.available ? 'Agregar al pedido ＋' : 'Consultar por WhatsApp ↗'}
        </button>
      </div>
    </article>
  `;
    })
    .join('');

  setupGalleryListeners();

  grid.querySelectorAll('[data-add]').forEach((button) => {
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
  if (!product) return;
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

  const totalEl = $('#total-divisa');
  if (totalEl) totalEl.textContent = money(totalPrice);

  const mobileBar = $('#mobile-cart-bar');
  const mcbCount = $('#mcb-count');
  const mcbTotal = $('#mcb-total');
  if (mobileBar) {
    if (count > 0) {
      mobileBar.hidden = false;
      if (mcbCount) mcbCount.textContent = count;
      if (mcbTotal) mcbTotal.textContent = money(totalPrice);
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

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2400);
}

function buildOrderText(entries, totalPrice, zone) {
  const lines = entries.map(({ product, qty }) => {
    const sub = product.price ? ` — ${money(product.price * qty)}` : '';
    return `• ${qty} x ${product.brand} ${product.name} (${product.spec})${sub}`;
  });

  return [
    '¡Hola Once Sports! Quiero preparar este pedido:',
    '',
    ...lines,
    '',
    `Total estimado: ${money(totalPrice)}`,
    `Zona o dirección de entrega: ${zone || 'Por coordinar por chat (Valencia)'}`,
    '',
    'Quedo atento/a para coordinar disponibilidad y delivery.'
  ].join('\n');
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

function init() {
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

  renderProducts();
  renderCart();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
