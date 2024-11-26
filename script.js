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
    cortinas_gasa: document.getElementById('cortinas_gasaContainer')
};

// Functions
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
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
    const categories = ['velas', 'aromas', 'ceramica', 'textiles', 'accesorios', 'cubre_sommier', 'cortinas_interior', 'cortinas_gasa'];

    categories.forEach(category => {
        const container = productContainers[category];
        if (container && products[category]) {
            container.innerHTML = products[category].map(product => {
                const discountedPrice = product.price * 0.9; // Apply 10% discount
                return `
                    <div class="product-card flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden relative">
                        <div class="p-4">
                            <div class="relative mb-4 aspect-square">
                                <!-- Updated discount tag with custom colors -->
                                <div class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold z-10"
                                    style="background-color: #D4C098; color: #848071;">
                                    10% OFF
                                </div>
                                <img src="${product.image}" alt="${product.name}" class="object-contain w-full h-full">
                            </div>
                            <h3 class="text-sm font-medium line-clamp-2 font-serif">${product.name}</h3>
                            <p class="mt-2 text-lg font-bold">
                                <span class="line-through text-gray-500">$${product.price.toLocaleString()}</span>
                                $${discountedPrice.toLocaleString()}
                            </p>
                            <button class="w-full mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors" onclick="openProductModal(${product.id}, '${category}')">
                                Ver detalles
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    });
}

function openProductModal(productId, category) {
    const product = products[category].find(p => p.id === productId);
    if (!product) return;

    const discountedPrice = product.price * 0.9; // Apply 10% discount

    const modalTitle = document.getElementById('productModalTitle');
    const modalContent = document.getElementById('productModalContent');

    modalTitle.textContent = product.name;
    modalContent.innerHTML = `
        <div class="grid gap-4 py-4">
            <div class="relative h-64 w-full">
                <img src="${product.image}" alt="${product.name}" class="object-contain w-full h-full">
            </div>
            <p class="text-gray-600">${product.description}</p>
            <p class="text-lg font-bold">
                <span class="line-through text-gray-500">$${product.price.toLocaleString()}</span>
                $${discountedPrice.toLocaleString()}
            </p>
            <div class="flex items-center justify-between">
                <label for="quantity" class="text-sm font-medium">Cantidad:</label>
                <div class="flex items-center">
                    <button class="bg-gray-200 px-2 py-1 rounded-l" onclick="updateQuantity(-1)">-</button>
                    <input id="quantity" type="number" class="w-16 text-center border-t border-b" value="1" min="1">
                    <button class="bg-gray-200 px-2 py-1 rounded-r" onclick="updateQuantity(1)">+</button>
                </div>
            </div>
            <button class="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors" onclick="addToCart(${product.id}, '${category}')">
                Agregar al carrito
            </button>
        </div>
    `;

    document.getElementById('productModal').classList.remove('hidden');
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
    const product = products[category].find(p => p.id === productId);
    if (!product) return;

    const quantity = parseInt(document.getElementById('quantity').value);
    const discountedPrice = product.price * 0.9; // Apply 10% discount
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, price: discountedPrice, quantity });
    }

    updateCartUI();
    closeProductModal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
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
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain">
                <div>
                    <p class="font-medium font-serif">${item.name}</p>
                    <p class="text-sm text-gray-500">$${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
            </div>
            <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash h-4 w-4"></i>
            </button>
        </div>
    `).join('');

    cartTotalEl.textContent = formatPrice(total);
    document.getElementById('discountedTotal').textContent = formatPrice(total * 0.9); // Update: Changed discount to 10%
    
    // Update shipping cost display
    document.getElementById('shippingCost').textContent = formatPrice(shippingCost);
    updateTotal();
    updateTransferModal(); // Actualiza el modal de transferencia
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
    document.getElementById('discountedTotal').textContent = formatPrice(total * 0.9); // Update: Changed discount to 10%
    document.getElementById('shippingCost').textContent = formatPrice(shippingCost);
    updateTransferModal(); // Actualiza el modal de transferencia
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
        total: item.price * item.quantity
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
            updateTransferModal(); // Actualiza el contenido del modal de transferencia
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

        // Log de los datos que se están enviando
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
                    throw new Error(`Error en el envío del formulario: ${response.status} ${response.statusText}\n${text}`);
                });
            }
        }).then(data => {
            console.log('Respuesta exitosa de Formspree:', data);
            // Aquí llamamos a la función para iniciar el proceso de pago con Mercado Pago
            if (document.getElementById('paymentMethod').value === 'mercadopago') {
                initiateMercadoPagoPayment();
            } else {
                alert('Gracias por tu compra. Por favor, realiza la transferencia según los datos proporcionados.');
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

function updateTransferModal() {
    const modalContent = document.getElementById('bankDetailsModalContent');
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * 0.1; // 10% de descuento
    const total = subtotal + shippingCost - discount;

    let content = `
        <h3 class="text-lg font-bold mb-4">Detalles del pedido</h3>
        <div class="space-y-2">
            <h4 class="font-semibold">Productos:</h4>
            <ul class="list-disc pl-5">
    `;

    cart.forEach(item => {
        content += `
            <li>${item.name} - ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}</li>
        `;
    });

    content += `
            </ul>
            <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="flex justify-between">
                <span>Costo de envío:</span>
                <span>${formatPrice(shippingCost)}</span>
            </div>
            <div class="flex justify-between text-green-600">
                <span>Descuento (10%):</span>
                <span>-${formatPrice(discount)}</span>
            </div>
            <div class="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
            </div>
        </div>
        <div class="mt-6">
            <h4 class="font-semibold mb-2">Datos bancarios para la transferencia:</h4>
            <p>Banco: [Nombre del Banco]</p>
            <p>Titular: [Nombre del Titular]</p>
            <p>CBU: [Número de CBU]</p>
            <p>CUIT/CUIL: [Número de CUIT/CUIL]</p>
        </div>
        <p class="mt-4 text-sm text-gray-600">
            Por favor, realiza la transferencia por el monto total de ${formatPrice(total)} y envía el comprobante a [correo electrónico o número de WhatsApp].
        </p>
    `;

    modalContent.innerHTML = content;
}

// Actualiza la función que maneja el cambio de método de pago
document.getElementById('paymentMethod').addEventListener('change', function() {
    if (this.value === 'transferencia') {
        document.getElementById('bankDetailsModal').classList.remove('hidden');
        document.getElementById('mercadopago-button').classList.add('hidden');
        updateTransferModal(); // Actualiza el contenido del modal de transferencia
    } else if (this.value === 'mercadopago') {
        document.getElementById('bankDetailsModal').classList.add('hidden');
        document.getElementById('mercadopago-button').classList.remove('hidden');
    }
});

