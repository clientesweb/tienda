// State
let products = {};
let cart = [];
let currentBanner = 0;
let currentHeroImage = 0;
let shippingCost = 0;
let shippingOptions = {};

const bannerMessages = [
  "¡Nueva colección de textiles disponible!",
  "Envíos gratis en compras superiores a $150000",
  "¡Ofertas especiales en velas aromáticas!"
];

const heroImages = [
  "img/hero1.png",
  "img/hero2.png",
  "img/hero3.png"
];

// DOM Elements
const bannerMessageEl = document.getElementById('bannerMessage');
const cartItemCountEl = document.getElementById('cartItemCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const heroEl = document.getElementById('hero');
const productContainers = {
  velas: document.getElementById('velasContainer'),
  aromas: document.getElementById('aromasContainer'),
  ceramica: document.getElementById('ceramicaContainer'),
  textiles: document.getElementById('textilesContainer'),
  accesorios: document.getElementById('accesoriosContainer'),
  cubre_sommier: document.getElementById('cubre_sommierContainer'),
  cortinas_interior: document.getElementById('cortinas_interiorContainer'),
  cortinas_gasa: document.getElementById('cortinas_gasaContainer'),
  almohadones: document.getElementById('almohadonesContainer'),
  caminos_de_mesa: document.getElementById('caminos_de_mesaContainer'),
  manteles: document.getElementById('mantelesContainer'),
  box: document.getElementById('boxContainer')
};

// Functions
async function loadProducts() {
  try {
    const response = await fetch('products.json');
    products = await response.json();
    console.log('Productos cargados:', products);
    renderProducts();
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  } finally {
    hidePreloader();
  }
}

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
}

function updateBanner() {
  bannerMessageEl.textContent = bannerMessages[currentBanner];
  currentBanner = (currentBanner + 1) % bannerMessages.length;
}

function updateHero() {
  const img = document.createElement('img');
  img.src = heroImages[currentHeroImage];
  img.alt = "Hero image";
  img.className = "absolute top-0 left-0 w-full h-full object-cover";
  
  heroEl.innerHTML = '';
  heroEl.appendChild(img);
  
  currentHeroImage = (currentHeroImage + 1) % heroImages.length;
}

function renderProducts() {
  const categories = Object.keys(products).filter(key => Array.isArray(products[key]));

  categories.forEach(category => {
    const container = productContainers[category];
    if (container && products[category]) {
      container.innerHTML = products[category].map(product => `
        <div class="product-card flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
          <div class="p-4">
            <div class="relative mb-4 aspect-square">
              <div class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold z-10"
                style="background-color: #D4C098; color: #848071;">
                10% OFF
              </div>
              <img src="${product.image}" alt="${product.name}" class="object-contain w-full h-full">
            </div>
            <h3 class="text-sm font-medium line-clamp-2 font-serif">${product.name}</h3>
            ${renderProductPrice(product, category)}
            ${renderProductOptions(product, category)}
            <button class="w-full mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors" onclick="openProductModal('${product.id}', '${category}')">
              Ver detalles
            </button>
          </div>
        </div>
      `).join('');
    }
  });
}

function renderProductPrice(product, category) {
  if (product.sizes) {
    const minPrice = Math.min(...product.sizes.map(s => s.price));
    return `<p class="mt-2 text-sm text-gray-500">Desde $${minPrice.toLocaleString()}</p>`;
  } else {
    const price = product.price;
    const discountedPrice = price * 0.9;
    return `
      <p class="mt-2 text-lg font-bold">
        <span class="line-through text-gray-500">$${price.toLocaleString()}</span>
        $${discountedPrice.toLocaleString()}
      </p>
    `;
  }
}

function renderProductOptions(product, category) {
  let html = '';
  if (category === 'velas' || category === 'aromas') {
    const scents = category === 'velas' ? products.esencias_velas : products.esencias_spray_difusores;
    html += `
      <select class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" id="${product.id}-scent">
        <option value="">Seleccionar aroma</option>
        ${scents.map(scent => `<option value="${scent}">${scent}</option>`).join('')}
      </select>
    `;
  } else if (product.sizes) {
    html += `
      <select class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" id="${product.id}-size">
        <option value="">Seleccionar medida</option>
        ${product.sizes.map(size => `<option value="${size.name}">${size.name} - $${size.price.toLocaleString()}</option>`).join('')}
      </select>
    `;
  }
  if (product.options) {
    product.options.forEach((option, index) => {
      const optionId = `${product.id}-${option.name.replace(/\s+/g, '-').toLowerCase()}`;
      html += `
        <div class="mt-2">
          <label for="${optionId}" class="block text-sm font-medium text-gray-700">${option.name}</label>
          <select id="${optionId}" name="${option.name}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm">
            <option value="">Seleccionar ${option.name}</option>
            ${option.choices.map(choice => `<option value="${choice}">${choice}</option>`).join('')}
          </select>
        </div>
      `;
    });
  }
  return html;
}

function openProductModal(productId, category) {
  console.log('Abriendo modal para el producto:', productId, 'en la categoría:', category);
  
  const modal = document.getElementById('productModal');
  const modalTitle = document.getElementById('productModalTitle');
  const modalContent = document.getElementById('productModalContent');

  const product = products[category].find(p => p.id == productId);

  if (!product) {
    console.error('Producto no encontrado:', productId);
    return;
  }

  modalTitle.textContent = product.name;

  let sizeOptions = '';
  let priceDisplay = '';
  let scentOptions = '';

  if (product.sizes) {
    sizeOptions = `
      <div class="mb-4">
        <label for="size" class="block text-sm font-medium text-gray-700 mb-2">Medida</label>
        <select id="size" name="size" class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
          <option value="">Seleccionar medida</option>
          ${product.sizes.map(size => `<option value="${size.name}">${size.name} - $${size.price.toLocaleString()}</option>`).join('')}
        </select>
      </div>
    `;
    priceDisplay = `<p class="text-2xl font-bold mb-4">Desde $${Math.min(...product.sizes.map(s => s.price)).toLocaleString()}</p>`;
  } else {
    const price = product.price;
    const discountedPrice = price * 0.9;
    priceDisplay = `
      <p class="text-2xl font-bold mb-4">
        <span class="line-through text-gray-500 mr-2">$${price.toLocaleString()}</span>
        <span class="text-primary">$${discountedPrice.toLocaleString()}</span>
      </p>
    `;
  }

  if (category === 'velas' || category === 'aromas') {
    const scents = category === 'velas' ? products.esencias_velas : products.esencias_spray_difusores;
    scentOptions = `
      <div class="mb-4">
        <label for="scent" class="block text-sm font-medium text-gray-700 mb-2">Aroma</label>
        <select id="scent" name="scent" class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
          <option value="">Seleccionar aroma</option>
          ${scents.map(scent => `<option value="${scent}">${scent}</option>`).join('')}
        </select>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="flex flex-col md:flex-row md:space-x-6">
      <div class="md:w-1/2">
        <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-contain rounded-lg shadow-md">
      </div>
      <div class="md:w-1/2 mt-4 md:mt-0 flex flex-col justify-between">
        <div>
          <p class="text-gray-600 mb-4">${product.description}</p>
          ${priceDisplay}
          ${sizeOptions}
          ${scentOptions}
          ${renderProductOptions(product, category)}
        </div>
        <div>
          <div class="flex items-center justify-between mb-4">
            <label for="quantity" class="text-sm font-medium text-gray-700">Cantidad:</label>
            <div class="flex items-center">
              <button class="bg-gray-200 px-3 py-1 rounded-l" onclick="updateQuantity(-1)">-</button>
              <input id="quantity" type="number" class="w-16 text-center border-t border-b" value="1" min="1">
              <button class="bg-gray-200 px-3 py-1 rounded-r" onclick="updateQuantity(1)">+</button>
            </div>
          </div>
          <button class="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold" onclick="addToCart('${product.id}', '${category}')">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  console.log('Modal mostrado');
}

function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
}

function updateQuantity(change) {
  const quantityInput = document.getElementById('quantity');
  let newQuantity = parseInt(quantityInput.value) + change;
  if (newQuantity < 1) newQuantity = 1;
  quantityInput.value = newQuantity;
}

function addToCart(productId, category) {
  const product = products[category].find(p => p.id == productId);
  if (!product) return;

  const quantity = parseInt(document.getElementById('quantity').value);
  const scent = document.getElementById('scent') ? document.getElementById('scent').value : null;
  const size = document.getElementById('size') ? document.getElementById('size').value : null;

  const options = {};
  if (product.options) {
    product.options.forEach(option => {
      const optionId = `${product.id}-${option.name.replace(/\s+/g, '-').toLowerCase()}`;
      const selectedOption = document.getElementById(optionId).value;
      if (!selectedOption) {
        alert(`Por favor, selecciona ${option.name}.`);
        return;
      }
      options[option.name] = selectedOption;
    });
  }

  let price;
  if (product.sizes) {
    const selectedSize = product.sizes.find(s => s.name === size);
    if (!selectedSize) {
      alert('Por favor, selecciona una medida.');
      return;
    }
    price = selectedSize.price * 0.9; // Apply 10% discount
  } else {
    price = product.price * 0.9; // Apply 10% discount
  }

  if ((category === 'velas' || category === 'aromas') && !scent) {
    alert('Por favor, selecciona un aroma.');
    return;
  }

  if (product.sizes && !size) {
    alert('Por favor, selecciona una medida.');
    return;
  }

  const existingItem = cart.find(item => 
    item.id === product.id && 
    item.scent === scent &&
    item.size === size &&
    JSON.stringify(item.options) === JSON.stringify(options)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, price, quantity, scent, size, options });
  }

  updateCartUI();
  closeProductModal();
}

function removeFromCart(productId, scent, size, options) {
  options = JSON.parse(options);
  cart = cart.filter(item => !(
    item.id === productId && 
    item.scent === scent && 
    item.size === size &&
    JSON.stringify(item.options) === JSON.stringify(options)
  ));
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Recalculate shipping cost
  const shippingMethod = document.getElementById('shippingMethod').value;
  const selectedShipping = shippingOptions[shippingMethod];
  if (selectedShipping) {
    shippingCost = calculateShippingCost(selectedShipping.price, totalItems);
  }
  
  const total = subtotal + shippingCost;

  cartItemCountEl.textContent = totalItems;
  cartItemCountEl.classList.toggle('hidden', totalItems === 0);

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="${item.images[0]}" alt="${item.name}" class="w-12 h-12 object-contain">
        <div>
          <p class="font-medium font-serif">${item.name}</p>
          <p class="text-sm text-gray-500">$${item.price.toLocaleString()} x ${item.quantity}</p>
          ${item.scent ? `<p class="text-xs text-gray-500">Aroma: ${item.scent}</p>` : ''}
          ${item.size ? `<p class="text-xs text-gray-500">Medida: ${item.size}</p>` : ''}
          ${Object.entries(item.options || {}).map(([key, value]) => 
            `<p class="text-xs text-gray-500">${key}: ${value}</p>`
          ).join('')}
        </div>
      </div>
      <button class="text-red-500 hover:text-red-700" onclick="removeFromCart('${item.id}', '${item.scent}', '${item.size}', '${JSON.stringify(item.options)}')">
        <i class="fas fa-trash h-4 w-4"></i>
      </button>
    </div>
  `).join('');

  cartTotalEl.textContent = formatPrice(total);
  document.getElementById('discountedTotal').textContent = formatPrice(total * 0.9);
  
  // Update shipping cost display
  document.getElementById('shippingCost').textContent = formatPrice(shippingCost);
  updateTotal();
  updateTransferModal();
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price);
}

function calculateShipping(postalCode) {
  return new Promise((resolve) => {
    setTimeout(() => {
      shippingOptions = {
        correoArgentinoDomicilio: {
          name: "Correo Argentino Envío a domicilio clásico",
          price: 9742,
          estimatedDelivery: '3 a 6 días hábiles (luego de ser despachado)',
          logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/correo-argentino-shipment-icon-Lk0cW7gu5xXw5o1TDUht0qHCPguHn4.png'
        },
        correoArgentinoSucursal: {
          name: "Correo Argentino Envío a sucursal",
          price: 6135,
          estimatedDelivery: '3 a 6 días hábiles (luego de ser despachado)',
          logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/correo-argentino-shipment-icon-Lk0cW7gu5xXw5o1TDUht0qHCPguHn4.png'
        },
        andreaniEstandar: {
          name: "Andreani Estandar Envío a domicilio",
          price: 10457.39,
          estimatedDelivery: '3-4 días hábiles (luego de ser despachado)',
          logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/descarga-3IKzLYo9d0C1H0FACUsSAZkuDgCuAi.svg'
        },
        retiroLocal: {
          name: "Retiro en local",
          price: 0,
          estimatedDelivery: 'Inmediato',
          logo: 'path/to/local-icon.png',
          description: 'Tienda Mon Amour - Rivera Indarte 160, centro. Córdoba - Atención de lunes a viernes de 9 a 19 hs y sábados de 9 a 14 hs.'
        }
      };
      resolve(shippingOptions);
    }, 1000);
  });
}

function updateShippingOptions(shippingOptions) {
  const shippingSelect = document.getElementById('shippingMethod');
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  shippingSelect.innerHTML = Object.entries(shippingOptions).map(([key, option]) => {
    const updatedPrice = calculateShippingCost(option.price, itemCount);
    return `
      <option value="${key}">
        ${option.name} - ${updatedPrice > 0 ? `$${updatedPrice.toFixed(2)}` : 'Gratis'} (${option.estimatedDelivery})
      </option>
    `;
  }).join('');
}

function calculateShippingCost(baseShippingCost, itemCount, incrementPercentage = 28) {
  if (itemCount <= 1) {
    return baseShippingCost;
  } else {
    const additionalCost = baseShippingCost * (incrementPercentage / 100) * (itemCount - 1);
    return baseShippingCost + additionalCost;
  }
}

function updateTotal() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingMethod = document.getElementById('shippingMethod').value;
  const selectedShipping = shippingOptions[shippingMethod];
  
  if (selectedShipping) {
    shippingCost = calculateShippingCost(selectedShipping.price, itemCount);
  }

  const total = subtotal + shippingCost;
  document.getElementById('cartTotal').textContent = formatPrice(total);
  document.getElementById('discountedTotal').textContent = formatPrice(total * 0.9);
  document.getElementById('shippingCost').textContent = formatPrice(shippingCost);
  updateTransferModal();
}

function updateAdvertisingBanner() {
  const advertisingBanner = document.getElementById('advertisingBanner');
  const advertisingMessage = document.getElementById('advertisingMessage');
  const currentHour = new Date().getHours();
  let message, backgroundImage;

  if (currentHour >= 6 && currentHour < 12) {
    message = "¡Oferta matutina! 10% de descuento en todas las velas aromáticas";
    backgroundImage = "url('img/mañana.png')";
  } else if (currentHour >= 12 && currentHour < 18) {
    message = "¡Especial de la tarde! Compra un textil y lleva el segundo a mitad de precio";
    backgroundImage = "url('img/tarde.png')";
  } else {
    message = "¡Oferta nocturna! Envío gratis en compras superiores a $150000";
    backgroundImage = "url('img/noche.png')";
  }

  advertisingMessage.textContent = message;
  advertisingBanner.style.backgroundImage = backgroundImage;
}

function prepareCartData() {
  return JSON.stringify(cart.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    total: item.price * item.quantity,
    scent: item.scent,
    size: item.size,
    options: item.options
  })));
}

function validateForm() {
  const requiredFields = document.querySelectorAll('#checkoutForm [required]');
  for (let field of requiredFields) {
    if (!field.value) {
      alert(`Por favor, completa el campo ${field.name}`);
      return false;
    }
  }
  return true;
}

function updateTransferModal() {
  const modalContent = document.getElementById('bankDetailsModal');
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.1; // 10% discount
  const total = subtotal + shippingCost - discount;

  let content = `
    <div class="mt-4 p-6 bg-white rounded-lg shadow-lg">
      <h3 class="text-2xl font-bold mb-6 text-primary">Detalles del pedido</h3>
      <div class="space-y-4">
        <h4 class="font-semibold text-lg">Productos:</h4>
        <ul class="list-disc pl-5 space-y-2">
  `;

  cart.forEach(item => {
    content += `
      <li class="text-gray-700">${item.name} - ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}</li>
    `;
  });

  content += `
        </ul>
        <div class="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="flex justify-between text-lg">
          <span>Costo de envío:</span>
          <span>${formatPrice(shippingCost)}</span>
        </div>
        <div class="flex justify-between text-lg text-green-600">
          <span>Descuento (10%):</span>
          <span>-${formatPrice(discount)}</span>
        </div>
        <div class="flex justify-between font-bold text-xl text-primary">
          <span>Total:</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>
      <div class="mt-8 p-4 bg-gray-100 rounded-lg">
        <h4 class="font-semibold text-lg mb-4">Datos bancarios para la transferencia:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span class="font-medium">Banco:</span> Banco Supervielle</p>
          <p><span class="font-medium">Titular:</span> Virginia Olivero</p>
          <p><span class="font-medium">CTA:</span> CA ARS 131-4372490-5</p>
          <p><span class="font-medium">CBU:</span> 0270131420043724900058</p>
          <p><span class="font-medium">ALIAS:</span> MON.AMOUR.TEXTIL</p>
          <p><span class="font-medium">CUIT/CUIL:</span> 27-37092938-1</p>
        </div>
        <button id="copyBankDetails" class="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark transition-colors">
          Copiar datos bancarios
        </button>
      </div>
      <div class="mt-6 text-center">
        <p class="text-lg mb-4">
          Por favor, realiza la transferencia por el monto total de <span class="font-bold text-primary">${formatPrice(total)}</span>
        </p>
        <p class="text-gray-700 mb-6">Envía el comprobante por uno de estos medios:</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="mailto:info@monamourtextil.com" class="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            Enviar por Email
          </a>
          <a href="https://wa.me/5493534786106" target="_blank" rel="noopener noreferrer" class="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Enviar por WhatsApp
          </a>
        </div>
        <button id="downloadPurchaseDetails" class="mt-6 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors">
          Descargar detalles de la compra
        </button>
      </div>
    </div>
  `;

  modalContent.innerHTML = content;
  modalContent.classList.remove('hidden');

  // Add functionality to copy bank details without showing an alert
  document.getElementById('copyBankDetails').addEventListener('click', function() {
    const bankDetails = `
Banco: Banco Supervielle
Titular: Virginia Olivero
CTA: CA ARS 131-4372490-5
CBU: 0270131420043724900058
ALIAS: MON.AMOUR.TEXTIL
CUIT/CUIL: 27-37092938-1
    `.trim();
    navigator.clipboard.writeText(bankDetails).then(() => {
      this.textContent = 'Datos copiados';
      setTimeout(() => {
        this.textContent = 'Copiar datos bancarios';
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar: ', err);
    });
  });

  // Add functionality to download purchase details
  document.getElementById('downloadPurchaseDetails').addEventListener('click', function() {
    try {
      const purchaseDetails = generatePurchaseDetails();
      const url = URL.createObjectURL(purchaseDetails);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'detalles_compra.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      throw error;
    }
  });

// Implementación del slider automático para el banner de publicidad
let currentAdSlide = 0;
const adSlides = document.querySelectorAll('.ad-slide');

function showAdSlide(index) {
  adSlides.forEach((slide, i) => {
    if (i === index) slide.style.display = 'block';
    else
      slide.style.display = 'none';
  });
}

function nextAdSlide() {
  currentAdSlide = (currentAdSlide + 1) % adSlides.length;
  showAdSlide(currentAdSlide);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Verifica si jsPDF está disponible
  if (typeof window.jspdf === 'undefined') {
    console.error('jsPDF no está cargado correctamente');
    alert('Hubo un problema al cargar algunas dependencias. Por favor, recarga la página.');
  }

  document.getElementById('closeBanner').addEventListener('click', () => {
    document.getElementById('topBanner').classList.add('hidden');
  });

  document.getElementById('mobileMenuButton').addEventListener('click', () => {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('open');
    document.getElementById('mobileMenu').classList.toggle('hidden');
  });

  document.getElementById('closeMobileMenu').addEventListener('click', () => {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.remove('open');
    document.getElementById('mobileMenu').classList.add('hidden');
  });

  document.getElementById('cartButton').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('hidden');
  });

  document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('hidden');
  });

  document.getElementById('closeProductModal').addEventListener('click', closeProductModal);

  document.getElementById('whatsappButton').addEventListener('click', () => {
    window.open('https://wa.me/5493534786106', '_blank');
  });

  document.getElementById('closeWhatsappNotification').addEventListener('click', () => {
    document.getElementById('whatsappNotification').classList.add('hidden');
  });

  document.getElementById('searchShipping').addEventListener('click', () => {
    const postalCode = document.getElementById('postalCode').value;
    if (postalCode.length === 4) {
      calculateShipping(postalCode)
        .then(shippingOptions => {
          updateShippingOptions(shippingOptions);
          document.getElementById('shippingOptions').classList.remove('hidden');
          const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
          const selectedShippingMethod = document.getElementById('shippingMethod').value;
          shippingCost = calculateShippingCost(shippingOptions[selectedShippingMethod].price, itemCount);
          updateTotal();
        });
    } else {
      alert('Por favor, ingrese un código postal válido.');
    }
  });

  document.getElementById('shippingMethod').addEventListener('change', function() {
    const selectedOption = shippingOptions[this.value];
    
    if (selectedOption) {
      const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      shippingCost = calculateShippingCost(selectedOption.price, itemCount);
      updateTotal();
    }
  });

  document.getElementById('checkoutButton').addEventListener('click', function() {
    document.getElementById('cartModal').classList.add('hidden');
    document.getElementById('checkoutModal').classList.remove('hidden');
  });

  document.getElementById('closeCheckoutModal').addEventListener('click', function() {
    document.getElementById('checkoutModal').classList.add('hidden');
  });

  document.getElementById('paymentMethod').addEventListener('change', function() {
    if (this.value === 'transferencia') {
      document.getElementById('bankDetailsModal').classList.remove('hidden');
      document.getElementById('mercadopago-button').classList.add('hidden');
      updateTransferModal();
    } else if (this.value === 'mercadopago') {
      document.getElementById('bankDetailsModal').classList.add('hidden');
      document.getElementById('mercadopago-button').classList.remove('hidden');
    }
  });

  document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData(this);
    formData.append('cartItems', prepareCartData());

    console.log('Datos del formulario:', Object.fromEntries(formData));

    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => {
          throw new Error(`Error en el envío del formulario: ${response.status} ${response.statusText}
${text}`);
        });
      }
    }).then(data => {
      console.log('Respuesta exitosa de Formspree:', data);
      if (document.getElementById('paymentMethod').value === 'mercadopago') {
        initiateMercadoPagoPayment();
      } else {
        // Trigger the download of purchase details
        try {
          const purchaseDetails = generatePurchaseDetails();
          const url = URL.createObjectURL(purchaseDetails);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'detalles_compra.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error al descargar los detalles de la compra:', error);
          alert('Hubo un problema al generar los detalles de la compra. Por favor, intenta de nuevo.');
        }
        alert('Gracias por tu compra. Los detalles de la compra se han descargado automáticamente.');
      }
    }).catch(error => {
      console.error('Error detallado:', error);
      alert('Hubo un problema al procesar tu pedido. Por favor, revisa la consola para más detalles e intenta de nuevo.');
    });
  });

  loadProducts();
  updateBanner();
  setInterval(updateBanner, 5000);

  updateHero();
  setInterval(updateHero, 5000);

  updateAdvertisingBanner();
  setInterval(updateAdvertisingBanner, 3600000); // Update every hour

  setTimeout(() => {
    document.getElementById('whatsappNotification').classList.remove('hidden');
  }, 10000);

  // Iniciar el slider automático para el banner de publicidad
  showAdSlide(currentAdSlide);
  setInterval(nextAdSlide, 5000); // Cambiar cada 5 segundos

  // Implementación del menú acordeón para dispositivos móviles
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.accordion-icon');
      
      content.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
    });
  });

  // Remove preloader
  document.getElementById('preloader').style.display = 'none';
});

console.log("Script loaded successfully!");

