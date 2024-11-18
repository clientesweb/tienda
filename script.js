// Data
const products = {
    velas: [
        { id: 1, name: "Vitrè", price: 10700, image: "img/vitre.jpg", description: "Envase reutilizable de vidrio - 100 gr de cera de soja aromatizada" },
        { id: 2, name: "Conques", price: 9800, image: "img/conques.jpg", description: "Envase reutilizable de vidrio con tapa - 70 gr de cera de soja aromatizada" },
        { id: 3, name: "Dinan", price: 15600, image: "img/dinan.jpg", description: "Envase reutilizable de vidrio con tapa . 200 gr de cera de soja aromatizada" },
        { id: 4, name: "Saignon", price: 53000, image: "img/saignon.jpg", description: "Velón suspendido en envase reutilizable de vidrio. 500 gr de cera de soja aromatizada" },
        { id: 5, name: "Lottie pequeño", price: 6400, image: "img/lottie-pequeno.jpg", description: "Cuenco de 8cm de diámetro reutilizable de madera. 100 gr de cera de soja aromatizada" },
        { id: 6, name: "Lottie mediano", price: 8400, image: "img/lottie-mediano.jpg", description: "Cuenco de 12 cm de diámetro reutilizable de madera . 200 gr de cera de soja aromatizada (doble pabilo)" },
        { id: 7, name: "Jolie con flor", price: 7800, image: "img/jolie-con-flor.jpg", description: "Cuenco reutilizable de madera con 150gr. De cera de soja aromatizada" },
        { id: 8, name: "Yanis pequeña x3", price: 7500, image: "img/yanis-pequena-x3.jpg", description: "Set de 3 velas Yanis pequeñas" },
        { id: 9, name: "Teva x3", price: 10800, image: "img/teva-x3.jpg", description: "Set de 3 velas Teva" },
        { id: 10, name: "Yanis grande", price: 5300, image: "img/yanis-grande.jpg", description: "Vela Yanis grande" },
        { id: 11, name: "Bombones Marie", price: 2400, image: "img/bombones-marie.jpg", description: "5 mini bombones de cera de soja perfumados" },
        { id: 12, name: "Sèlène x3", price: 11400, image: "img/selene-x3.jpg", description: "Set de 3 velas Sèlène" },
    ],
    aromas: [
        { id: 13, name: "Difusor de Aromas Floral", price: 3200, image: "img/difusor-floral.jpg", description: "Difusor de aromas con esencia floral." },
        { id: 14, name: "Aceite Esencial de Eucalipto", price: 1800, image: "img/aceite-eucalipto.jpg", description: "Aceite esencial de eucalipto puro." },
        { id: 15, name: "Spray Ambiental Cítrico", price: 1500, image: "img/spray-citrico.jpg", description: "Spray ambiental con aroma cítrico refrescante." },
    ],
    textiles: [
        { id: 16, name: "Manta de Algodón", price: 4500, image: "img/manta-algodon.jpg", description: "Manta suave de algodón para sofá." },
        { id: 17, name: "Cojín Decorativo", price: 2200, image: "img/cojin-decorativo.jpg", description: "Cojín decorativo con diseño moderno." },
        { id: 18, name: "Cortinas de Lino", price: 6800, image: "img/cortinas-lino.jpg", description: "Cortinas de lino elegantes para sala." },
    ],
    ceramica: [
        { id: 19, name: "Juego de Tazas", price: 3800, image: "img/juego-tazas.jpg", description: "Juego de tazas de cerámica artesanal." },
        { id: 20, name: "Florero de Cerámica", price: 2900, image: "img/florero-ceramica.jpg", description: "Florero de cerámica con diseño único." },
        { id: 21, name: "Plato Decorativo", price: 2500, image: "img/plato-decorativo.jpg", description: "Plato decorativo de cerámica pintada a mano." },
    ],
};

const bannerMessages = [
    "¡Nueva colección de textiles disponible!",
    "Envíos gratis en compras superiores a $10000",
    "¡Ofertas especiales en velas aromáticas!"
];

const heroImages = [
    "img/hero1.jpg",
    "img/hero2.jpg",
    "img/hero3.jpg"
];

// State
let cart = [];
let currentBanner = 0;
let currentHeroImage = 0;
let shippingCost = 0;

// DOM Elements
const bannerMessageEl = document.getElementById('bannerMessage');
const cartItemCountEl = document.getElementById('cartItemCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const heroEl = document.getElementById('hero');
const productContainers = {
    velas: document.getElementById('velasContainer'),
    aromas: document.getElementById('aromasContainer'),
    textiles: document.getElementById('textilesContainer'),
    ceramica: document.getElementById('ceramicaContainer'),
};

// Functions
function updateBanner() {
    bannerMessageEl.textContent = bannerMessages[currentBanner];
    currentBanner = (currentBanner + 1) % bannerMessages.length;
}

function updateHero() {
    heroEl.style.backgroundImage = `url('${heroImages[currentHeroImage]}')`;
    heroEl.style.backgroundSize = 'cover';
    heroEl.style.backgroundPosition = 'center';
    currentHeroImage = (currentHeroImage + 1) % heroImages.length;
}

function renderProducts() {
    for (const [category, productList] of Object.entries(products)) {
        productContainers[category].innerHTML = productList.map(product => `
            <div class="product-card flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-4">
                    <div class="relative mb-4 aspect-square">
                        <img src="${product.image}" alt="${product.name}" class="object-contain w-full h-full">
                    </div>
                    <h3 class="text-sm font-medium line-clamp-2">${product.name}</h3>
                    <p class="mt-2 text-lg font-bold">$${product.price.toLocaleString()}</p>
                    <button class="w-full mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors" onclick="openProductModal(${product.id}, '${category}')">
                        Ver detalles
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function scrollProducts(category, amount) {
    productContainers[category].scrollBy({ left: amount, behavior: 'smooth' });
}

function openProductModal(productId, category) {
    const product = products[category].find(p => p.id === productId);
    if (!product) return;

    const modalTitle = document.getElementById('productModalTitle');
    const modalContent = document.getElementById('productModalContent');

    modalTitle.textContent = product.name;
    modalContent.innerHTML = `
        <div class="grid gap-4 py-4">
            <div class="relative h-64 w-full">
                <img src="${product.image}" alt="${product.name}" class="object-contain w-full h-full">
            </div>
            <p class="text-gray-600">${product.description}</p>
            <p class="text-lg font-bold">$${product.price.toLocaleString()}</p>
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
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
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
    const total = subtotal + shippingCost;

    cartItemCountEl.textContent = totalItems;
    cartItemCountEl.classList.toggle('hidden', totalItems === 0);

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p class="text-sm text-gray-500">$${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
            </div>
            <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash h-4 w-4"></i>
            </button>
        </div>
    `).join('');

    cartTotalEl.textContent = total.toLocaleString();
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

function calculateShipping(postalCode) {
    // Simular una llamada a la API de Mercado Envíos
    return new Promise((resolve) => {
        setTimeout(() => {
            const shippingOptions = {
                standard: {
                    name: "Estándar",
                    price: 500,
                    estimatedDelivery: '3-5 días hábiles'
                },
                express: {
                    name: "Express",
                    price: 800,
                    estimatedDelivery: '1-2 días hábiles'
                }
            };
            resolve(shippingOptions);
        }, 1000);
    });
}

function updateShippingOptions(shippingOptions) {
    const shippingSelect = document.getElementById('shippingMethod');
    shippingSelect.innerHTML = Object.entries(shippingOptions).map(([key, option]) => `
        <option value="${key}">${option.name} - $${option.price} (${option.estimatedDelivery})</option>
    `).join('');
}

function updateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;
    document.getElementById('cartTotal').textContent = formatPrice(total);
}

function updateAdvertisingBanner() {
    const advertisingBanner = document.getElementById('advertisingBanner');
    const advertisingMessage = document.getElementById('advertisingMessage');
    const currentHour = new Date().getHours();
    let message, backgroundImage;

    if (currentHour >= 6 && currentHour < 12) {
        message = "¡Oferta matutina! 15% de descuento en todas las velas aromáticas";
        backgroundImage = "url('img/morning-banner.jpg')";
    } else if (currentHour >= 12 && currentHour < 18) {
        message = "¡Especial de la tarde! Compra un textil y lleva el segundo a mitad de precio";
        backgroundImage = "url('img/afternoon-banner.jpg')";
    } else {
        message = "¡Oferta nocturna! Envío gratis en compras superiores a $8000";
        backgroundImage = "url('img/night-banner.jpg')";
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
        document.getElementById('checkoutModal').classList.remove('hidden');
    });

    document.getElementById('closeCheckoutModal').addEventListener('click', () => {
        document.getElementById('checkoutModal').classList.add('hidden');
    });

    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);

    document.getElementById('searchShipping').addEventListener('click', () => {
        const postalCode = document.getElementById('postalCode').value;
        if (postalCode.length === 4) {
            calculateShipping(postalCode)
                .then(shippingOptions => {
                    updateShippingOptions(shippingOptions);
                    document.getElementById('shippingOptions').classList.remove('hidden');
                    shippingCost = shippingOptions.standard.price;
                    updateTotal();
                });
        } else {
            alert('Por favor, ingrese un código postal válido.');
        }
    });

    document.getElementById('shippingMethod').addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        shippingCost = parseInt(selectedOption.textContent.match(/\$(\d+)/)[1]);
        updateTotal();
    });

    document.getElementById('paymentMethod').addEventListener('change', function() {
        if (this.value === 'transferencia') {
            document.getElementById('bankDetailsModal').classList.remove('hidden');
        }
    });

    document.getElementById('closeBankDetailsModal').addEventListener('click', function() {
        document.getElementById('bankDetailsModal').classList.add('hidden');
    });

    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData(this);
        formData.append('cartItems', prepareCartData());

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
                throw new Error('Error en el envío del formulario');
            }
        }).then(data => {
            console.log(data);
            alert('¡Gracias por tu compra! Te enviaremos un correo con los detalles.');
            cart = [];
            updateCartUI();
            document.getElementById('checkoutModal').classList.add('hidden');
        }).catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al procesar tu pedido. Por favor, intenta de nuevo.');
        });
    });

    updateBanner();
    setInterval(updateBanner, 5000);

    updateHero();
    setInterval(updateHero, 5000);

    renderProducts();

    updateAdvertisingBanner();
    setInterval(updateAdvertisingBanner, 3600000); // Update every hour

    // Remove preloader
    document.getElementById('preloader').style.display = 'none';
});

// Accordion functionality for mobile menu
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        button.classList.toggle('active');
        content.classList.toggle('open');
        button.querySelector('i').classList.toggle('fa-chevron-down');
        button.querySelector('i').classList.toggle('fa-chevron-up');
    });
});