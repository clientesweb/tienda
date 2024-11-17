// Global variables
let cart = [];
let shippingCost = 0;
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrbglzrk'; // Replace with your actual Formspree endpoint

// Helper Functions
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

// Product Data
const products = [
    { id: 1, name: "Vela Aromática Lavanda", price: 1500, category: "velas", image: "img/vela-lavanda.jpg" },
    { id: 2, name: "Difusor de Aromas Vainilla", price: 2000, category: "aromas", image: "img/difusor-vainilla.jpg" },
    { id: 3, name: "Almohadón Decorativo", price: 2500, category: "textiles", image: "img/almohadon-decorativo.jpg" },
    { id: 4, name: "Taza de Cerámica Artesanal", price: 1800, category: "ceramica", image: "img/taza-ceramica.jpg" },
    // Add more products as needed
];

// UI Functions
function displayProducts() {
    const categories = ['velas', 'aromas', 'textiles', 'ceramica'];
    categories.forEach(category => {
        const container = document.getElementById(`${category}Container`);
        const categoryProducts = products.filter(product => product.category === category);
        container.innerHTML = categoryProducts.map(product => `
            <div class="product-card bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${formatPrice(product.price)}</p>
                <button onclick="addToCart(${product.id})" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
                    Agregar al carrito
                </button>
            </div>
        `).join('');
    });
}

function updateCartUI() {
    const cartItemCount = document.getElementById('cartItemCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCount.textContent = totalItems;
    cartItemCount.classList.toggle('hidden', totalItems === 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center">
            <div>
                <h3 class="font-semibold">${item.name}</h3>
                <p class="text-gray-600">Cantidad: ${item.quantity}</p>
            </div>
            <div>
                <p class="font-semibold">${formatPrice(item.price * item.quantity)}</p>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingCost;
    cartTotal.textContent = formatPrice(total);
}

function scrollProducts(category, direction) {
    const container = document.getElementById(`${category}Container`);
    container.scrollBy({ left: direction, behavior: 'smooth' });
}

// Cart Functions
function addToCart(productId) {
    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

// Checkout Functions
function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Add cart items to form data
    cart.forEach((item, index) => {
        formData.append(`item_${index}_name`, item.name);
        formData.append(`item_${index}_quantity`, item.quantity);
        formData.append(`item_${index}_price`, item.price);
    });
    
    // Add total to form data
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingCost;
    formData.append('total', total);

    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Hide the form
            form.style.display = 'none';
            
            // Show the Mercado Pago button
            document.getElementById('mercadopago-button').classList.remove('hidden');
            
            // Initialize Mercado Pago button
            initMercadoPago();
        } else {
            throw new Error('Error en el envío del formulario');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    });
}

// Shipping Functions
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
        <option value="${key}">${option.name} - ${formatPrice(option.price)} (${option.estimatedDelivery})</option>
    `).join('');
}

// UI Update Functions
function updateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;
    document.getElementById('cartTotal').textContent = formatPrice(total);
}

function updateAdvertisingBanner() {
    const messages = [
        "¡Envío gratis en compras superiores a $10000!",
        "¡20% de descuento en toda la colección de verano!",
        "¡Nuevos diseños de almohadones disponibles!",
        "¡Compra ahora y recibe un regalo sorpresa!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('advertisingMessage').textContent = randomMessage;
}

// Hero Banner Functions
function setupHeroBanner() {
    const heroImages = [
        'img/hero1.jpg',
        'img/hero2.jpg',
        'img/hero3.jpg'
    ];
    let currentImageIndex = 0;
    const heroElement = document.getElementById('hero');

    function updateHeroImage() {
        heroElement.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
        heroElement.style.backgroundSize = 'cover';
        heroElement.style.backgroundPosition = 'center';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        updateHeroImage();
    }

    updateHeroImage();
    setInterval(nextImage, 5000); // Change image every 5 seconds
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartUI();
    setupHeroBanner();
    updateAdvertisingBanner();

    document.getElementById('cartButton').addEventListener('click', function() {
        document.getElementById('cartModal').classList.remove('hidden');
    });

    document.getElementById('closeCart').addEventListener('click', function() {
        document.getElementById('cartModal').classList.add('hidden');
    });

    document.getElementById('checkoutButton').addEventListener('click', function() {
        document.getElementById('cartModal').classList.add('hidden');
        document.getElementById('checkoutModal').classList.remove('hidden');
    });

    document.getElementById('closeCheckoutModal').addEventListener('click', function() {
        document.getElementById('checkoutModal').classList.add('hidden');
    });

    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);

    document.getElementById('mobileMenuButton').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.remove('hidden');
    });

    document.getElementById('closeMobileMenu').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.add('hidden');
    });

    document.getElementById('whatsappButton').addEventListener('click', function() {
        window.open('https://wa.me/5493534786106', '_blank');
    });

    // Show WhatsApp notification after 5 seconds
    setTimeout(function() {
        document.getElementById('whatsappNotification').classList.remove('hidden');
    }, 5000);

    document.getElementById('closeWhatsappNotification').addEventListener('click', function() {
        document.getElementById('whatsappNotification').classList.add('hidden');
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('cartModal')) {
            document.getElementById('cartModal').classList.add('hidden');
        }
        if (event.target === document.getElementById('checkoutModal')) {
            document.getElementById('checkoutModal').classList.add('hidden');
        }
    });

    // Remove preloader
    document.getElementById('preloader').style.display = 'none';
});

// Mercado Pago Integration
function initMercadoPago() {
    // Replace 'APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db' with your actual Mercado Pago public key
    const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingCost;

    mp.checkout({
        preference: {
            items: cart.map(item => ({
                title: item.name,
                quantity: item.quantity,
                currency_id: 'ARS',
                unit_price: item.price
            })),
            shipments: {
                cost: shippingCost,
                mode: "not_specified",
            }
        },
        render: {
            container: '#mercadopago-button',
            label: 'Pagar con Mercado Pago',
        }
    });
}

// For demonstration purposes only
console.log("Script loaded successfully!");