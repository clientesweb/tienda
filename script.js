// Data
const products = {
    velas: [
        { id: 1, name: "Vitrè", price: 10700, image: "img/velas1.png", description: "Envase reutilizable de vidrio - 100 gr de cera de soja aromatizada" },
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
        { id: 4, name: "Difusor de Aromas Floral", price: 3200, image: "https://images.unsplash.com/photo-1602178231289-a1e8e7f4c320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Difusor de aromas con esencia floral." },
        { id: 5, name: "Aceite Esencial de Eucalipto", price: 1800, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Aceite esencial de eucalipto puro." },
        { id: 6, name: "Spray Ambiental Cítrico", price: 1500, image: "https://images.unsplash.com/photo-1616011462185-0b493ddf0515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Spray ambiental con aroma cítrico refrescante." },
    ],
    textiles : [
    {
        id: 7,
        name: "Cortina Burdeos",
        price: 75200,
        image: "img/cortina-burdeos.jpg",
        description: "Cortina de baño confeccionada en 100% algodón con volados y puntilla. Mide 180x180 cm. Lazos para atar al barral. No encogen: son lavadas antes y después de su confección. Se entregan planchadas y perfumadas listas para colgar."
    },
    {
        id: 8,
        name: "Cortina Marsella",
        price: 60775,
        image: "img/cortina-marsella.jpg",
        description: "Cortina de baño confeccionada en 100% algodón con volados y puntilla. Mide 180x180 cm. Opcional: lazos para atar al barral u ojales para gancho. No encogen: son lavadas antes y después de su confección. Se entregan planchadas y perfumadas listas para colgar. No incluye protector."
    },
    {
        id: 9,
        name: "Cortina Niza",
        price: 60775,
        image: "img/cortina-niza.jpg",
        description: "Cortina de baño confeccionada en 100% algodón con volados y puntilla. Mide 180x180 cm. Opcional: lazos para atar al barral u ojales para gancho. No encogen: son lavadas antes y después de su confección. Se entregan planchadas y perfumadas listas para colgar. No incluye protector."
    }
],
    ceramica : [
    {
        id: 10,
        name: "Set de Mate Amelia",
        price: 30800,
        image: "img/set-mate-amelia.jpg",
        description: "Piezas de cerámica únicas realizadas y pintadas a mano. Incluye: mate, azucarera y plato de 22cm de diámetro."
    },
    {
        id: 11,
        name: "Set Sophie",
        price: 24000,
        image: "img/set-sophie.jpg",
        description: "Piezas de cerámica únicas realizadas y pintadas a mano. Incluye: taza y plato corazón."
    },
    {
        id: 12,
        name: "Fanal Lucia",
        price: 12000,
        image: "img/fanal-lucia.jpg",
        description: "Pieza de cerámica única realizada y pintada a mano. Incluye: fanal y plato."
    },
    {
        id: 13,
        name: "Set Julieta",
        price: 19400,
        image: "img/set-julieta.jpg",
        description: "Piezas de cerámica únicas realizadas y pintadas a mano. Incluye: tazón y plato tostada."
    },
    {
        id: 14,
        name: "Mini Florero Lea",
        price: 8000,
        image: "img/mini-florero-lea.jpg",
        description: "Pieza única de cerámica realizada y pintada a mano."
    },
    {
        id: 15,
        name: "Florero Luisa (forma de nube)",
        price: 14000,
        image: "img/florero-luisa.jpg",
        description: "Pieza única de cerámica realizada y pintada a mano con forma de nube."
    }
];

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
                    <h3 class="text-sm font-medium line-clamp-2 font-serif">${product.name}</h3>
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
                    <p class="font-medium font-serif">${item.name}</p>
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
        backgroundImage = "url('https://images.unsplash.com/photo-1602178231289-a1e8e7f4c320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')";
    } else if (currentHour >= 12 && currentHour < 18) {
        message = "¡Especial de la tarde! Compra un textil y lleva el segundo a mitad de precio";
        backgroundImage = "url('https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')";
    } else {
        message = "¡Oferta nocturna! Envío gratis en compras superiores a $8000";
        backgroundImage = "url('https://images.unsplash.com/photo-1616011462185-0b493ddf0515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')";
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

    document.getElementById('checkoutButton').addEventListener('click', function() {
        document.getElementById('cartModal').classList.add('hidden');
        document.getElementById('checkoutModal').classList.remove('hidden');
    });

    document.getElementById('closeCheckoutModal').addEventListener('click', function() {
        document.getElementById('checkoutModal').classList.add('hidden');
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
            initiateMercadoPagoPayment();
        }).catch(error => {
            console.error('Error detallado:', error);
            alert('Hubo un problema al procesar tu pedido. Por favor, revisa la consola para más detalles e intenta de nuevo.');
        });
    });

    updateBanner();
    setInterval(updateBanner, 5000);

    updateHero();
    setInterval(updateHero, 5000);

    renderProducts();

    updateAdvertisingBanner();
    setInterval(updateAdvertisingBanner, 3600000); // Update every hour

    setTimeout(() => {
        document.getElementById('whatsappNotification').classList.remove('hidden');
    }, 10000);

    // Remove preloader
    document.getElementById('preloader').style.display = 'none';
});

// Implementación del menú desplegable para la sección de tienda en el escritorio
document.addEventListener('DOMContentLoaded', function() {
    const shopLink = document.querySelector('nav a[href="#tienda"]');
    const dropdown = document.createElement('div');
    dropdown.className = 'absolute hidden bg-white border rounded-md shadow-lg mt-2 py-2 w-48';
    dropdown.innerHTML = `
        <a href="#velas" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Velas</a>
        <a href="#aromas" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Aromas</a>
        <a href="#textiles" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Textiles</a>
        <a href="#ceramica" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cerámica</a>
    `;
    
    shopLink.parentNode.appendChild(dropdown);
    
    shopLink.addEventListener('mouseenter', () => {
        dropdown.classList.remove('hidden');
    });
    
    shopLink.parentNode.addEventListener('mouseleave', () => {
        dropdown.classList.add('hidden');
    });
});

// For demonstration purposes only (this won't work in a Node.js environment)
console.log("Script loaded successfully!");