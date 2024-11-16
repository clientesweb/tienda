// Carrito de compras
let cart = [];

// Productos
const products = [
    { id: 1, name: "Vela Aromática Lavanda", price: 1500, category: "velas", image: "vela-lavanda.jpg" },
    { id: 2, name: "Difusor de Aromas Vainilla", price: 2000, category: "aromas", image: "difusor-vainilla.jpg" },
    { id: 3, name: "Almohadón Decorativo", price: 2500, category: "textiles", image: "almohadon-decorativo.jpg" },
    { id: 4, name: "Taza de Cerámica Artesanal", price: 1800, category: "ceramica", image: "taza-ceramica.jpg" },
    // Agrega más productos aquí
];

// Función para agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
    }
}

// Función para actualizar la UI del carrito
function updateCartUI() {
    const cartItemCount = document.getElementById('cartItemCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCount.textContent = totalItems;
    cartItemCount.classList.toggle('hidden', totalItems === 0);

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total;
}

// Función para mostrar productos
function displayProducts() {
    const containers = {
        velas: document.getElementById('velasContainer'),
        aromas: document.getElementById('aromasContainer'),
        textiles: document.getElementById('textilesContainer'),
        ceramica: document.getElementById('ceramicaContainer')
    };

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card bg-white p-4 rounded-lg shadow-md flex flex-col';
        productElement.innerHTML = `
            <img src="img/${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
            <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="mt-auto bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
                Agregar al carrito
            </button>
        `;
        containers[product.category].appendChild(productElement);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartUI();

    // Mostrar/ocultar carrito
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    cartButton.addEventListener('click', () => cartModal.classList.toggle('hidden'));
    closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));

    // Mostrar/ocultar menú móvil
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.querySelector('i').classList.toggle('open');
    });
    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.querySelector('i').classList.remove('open');
    });

    // Checkout
    const checkoutButton = document.getElementById('checkoutButton');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutModal = document.getElementById('closeCheckoutModal');

    checkoutButton.addEventListener('click', () => {
        checkoutModal.classList.remove('hidden');
        cartModal.classList.add('hidden');
    });
    closeCheckoutModal.addEventListener('click', () => checkoutModal.classList.add('hidden'));

    // Banner rotativo
    const bannerMessages = [
        "¡Envío gratis en compras superiores a $10000!",
        "¡20% de descuento en velas aromáticas!",
        "¡Nueva colección de textiles disponible!"
    ];
    let currentBannerIndex = 0;
    const bannerMessage = document.getElementById('bannerMessage');
    const topBanner = document.getElementById('topBanner');
    const closeBanner = document.getElementById('closeBanner');

    function rotateBanner() {
        bannerMessage.textContent = bannerMessages[currentBannerIndex];
        currentBannerIndex = (currentBannerIndex + 1) % bannerMessages.length;
    }

    rotateBanner();
    setInterval(rotateBanner, 5000);

    closeBanner.addEventListener('click', () => topBanner.classList.add('hidden'));

    // Hero banner rotativo
    const heroImages = ['hero1.jpg', 'hero2.jpg', 'hero3.jpg'];
    let currentHeroIndex = 0;
    const heroElement = document.getElementById('hero');

    function rotateHero() {
        heroElement.style.backgroundImage = `url('img/${heroImages[currentHeroIndex]}')`;
        currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    }

    rotateHero();
    setInterval(rotateHero, 5000);

    // Mostrar/ocultar notificación de WhatsApp
    const whatsappButton = document.getElementById('whatsappButton');
    const whatsappNotification = document.getElementById('whatsappNotification');
    const closeWhatsappNotification = document.getElementById('closeWhatsappNotification');

    setTimeout(() => {
        whatsappNotification.classList.remove('hidden');
    }, 5000);

    closeWhatsappNotification.addEventListener('click', () => {
        whatsappNotification.classList.add('hidden');
    });

    whatsappButton.addEventListener('click', () => {
        window.open('https://wa.me/5493534786106', '_blank');
    });

    // Animación del logo de WhatsApp
    whatsappButton.addEventListener('mouseover', () => {
        whatsappButton.querySelector('i').style.transform = 'scale(1.2)';
    });

    whatsappButton.addEventListener('mouseout', () => {
        whatsappButton.querySelector('i').style.transform = 'scale(1)';
    });

    // Banner publicitario rotativo
    const advertisingMessages = [
        "¡Descubre nuestra nueva colección de verano!",
        "¡Ofertas especiales en productos para el hogar!",
        "¡Envío gratis en compras superiores a $15000!"
    ];
    let currentAdIndex = 0;
    const advertisingMessage = document.getElementById('advertisingMessage');

    function rotateAdvertising() {
        advertisingMessage.textContent = advertisingMessages[currentAdIndex];
        currentAdIndex = (currentAdIndex + 1) % advertisingMessages.length;
    }

    rotateAdvertising();
    setInterval(rotateAdvertising, 7000);
});

// Función para desplazar productos
function scrollProducts(category, direction) {
    const container = document.getElementById(`${category}Container`);
    container.scrollBy({ left: direction, behavior: 'smooth' });
}

// MercadoPago integration
async function initMercadoPago() {
    console.log('Initializing MercadoPago...');
    const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db');

    try {
        const preference = await createPreference();
        console.log('Preference created:', preference);
        const bricksBuilder = mp.bricks();
        
        console.log('Creating Brick...');
        const renderComponent = await bricksBuilder.create("wallet", "mercadopago-button-container", {
            initialization: {
                preferenceId: preference.id,
            },
            callbacks: {
                onError: (error) => {
                    console.error('Error in MercadoPago Brick:', error);
                    alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
                },
                onReady: () => {
                    console.log("MercadoPago Brick ready");
                    console.log("MercadoPago button should be visible now");
                    document.getElementById('mercadopago-button-container').style.display = 'block';
                }
            },
        });
        console.log('Brick created successfully');
        console.log('Render component:', renderComponent);
    } catch (error) {
        console.error('Error initializing MercadoPago:', error);
        alert('Hubo un error al inicializar el pago. Por favor, intenta nuevamente.');
    }
}

async function createPreference() {
    try {
        const response = await fetch('/.netlify/functions/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart.map(item => ({
                    title: item.name,
                    unit_price: item.price,
                    quantity: item.quantity,
                })),
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error creating preference:', errorData);
            throw new Error(errorData.error || 'Error creating preference');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createPreference:', error);
        throw error;
    }
}

// Event listener for form submission
document.getElementById('checkoutForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Checkout form submitted');
    const formData = new FormData(this);
    formData.append('cart', JSON.stringify(cart));
    
    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('Form submission successful');
            // Clear the existing MercadoPago button container
            const mpContainer = document.getElementById('mercadopago-button-container');
            mpContainer.innerHTML = '';
            
            // Show the MercadoPago container
            mpContainer.style.display = 'block';
            
            // Initialize MercadoPago checkout
            await initMercadoPago();
            
            // Hide the form
            this.style.display = 'none';
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en el envío del formulario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Hubo un error al procesar tu pedido: ${error.message}. Por favor, intenta nuevamente.`);
    }
});

console.log("Script loaded successfully!");