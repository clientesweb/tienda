// Simulación de datos de productos
const products = [
    // Velas
    { id: 1, name: 'Vela Aromática Lavanda', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, description: 'Vela aromática de lavanda para relajación.', stock: 10, discount: 0 },
    { id: 2, name: 'Vela de Soja Natural', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, description: 'Vela de soja 100% natural y ecológica.', stock: 15, discount: 10 },
    { id: 3, name: 'Set de Velas Decorativas', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Set de 3 velas decorativas para el hogar.', stock: 5, discount: 0 },
    { id: 4, name: 'Vela en Tarro de Cristal', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Elegante vela en tarro de cristal.', stock: 8, discount: 5 },
    { id: 5, name: 'Vela Perfumada de Vainilla', price: 22.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, description: 'Vela con aroma a vainilla para ambientar.', stock: 12, discount: 0 },
    { id: 6, name: 'Vela de Cera de Abeja', price: 27.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Vela natural de cera de abeja.', stock: 6, discount: 15 },
    { id: 7, name: 'Vela Flotante', price: 15.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Velas flotantes para decoración.', stock: 20, discount: 0 },
    { id: 8, name: 'Vela de Citronela', price: 18.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Vela repelente de insectos para exterior.', stock: 15, discount: 0 },
    { id: 9, name: 'Vela de Masaje', price: 32.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Vela para masajes relajantes.', stock: 7, discount: 20 },
    { id: 10, name: 'Vela de Sándalo', price: 26.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Vela aromática con esencia de sándalo.', stock: 9, discount: 0 },
    { id: 11, name: 'Vela de Té', price: 12.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Set de velas de té para ambientar.', stock: 25, discount: 5 },
    { id: 12, name: 'Vela de Eucalipto', price: 23.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Vela refrescante con aroma a eucalipto.', stock: 11, discount: 0 },
    { id: 13, name: 'Vela de Jazmín', price: 25.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, description: 'Vela con delicado aroma a jazmín.', stock: 8, discount: 10 },

    // Cerámica
    { id: 14, name: 'Tazón de Cerámica Artesanal', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, description: 'Tazón hecho a mano con diseño único.', stock: 6, discount: 0 },
    { id: 15, name: 'Plato Decorativo de Cerámica', price: 44.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, description: 'Plato decorativo con motivos artesanales.', stock: 4, discount: 15 },
    { id: 16, name: 'Jarrón de Cerámica Pintado a Mano', price: 59.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Jarrón único pintado a mano.', stock: 3, discount: 0 },
    { id: 17, name: 'Set de Tazas de Café de Cerámica', price: 49.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, description: 'Set de 4 tazas de café artesanales.', stock: 8, discount: 10 },
    { id: 18, name: 'Maceta de Cerámica Decorativa', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, description: 'Maceta decorativa para plantas de interior.', stock: 10, discount: 0 },
    { id: 19, name: 'Cuenco de Cerámica', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Cuenco versátil para servir.', stock: 12, discount: 5 },
    { id: 20, name: 'Florero de Cerámica', price: 54.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Elegante florero de cerámica.', stock: 5, discount: 0 },
    { id: 21, name: 'Plato de Sushi de Cerámica', price: 37.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Plato especial para servir sushi.', stock: 7, discount: 0 },
    { id: 22, name: 'Tetera de Cerámica', price: 64.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Tetera artesanal con filtro incorporado.', stock: 4, discount: 20 },
    { id: 23, name: 'Azucarero de Cerámica', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Azucarero con tapa de cerámica.', stock: 9, discount: 0 },
    { id: 24, name: 'Salero y Pimentero de Cerámica', price: 32.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Set de salero y pimentero artesanal.', stock: 11, discount: 5 },
    { id: 25, name: 'Bandeja de Cerámica', price: 47.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Bandeja decorativa de cerámica.', stock: 6, discount: 0 },
    { id: 26, name: 'Jarra de Cerámica', price: 42.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, description: 'Jarra para servir con diseño único.', stock: 8, discount: 10 },

    // Textiles
    { id: 27, name: 'Cojín Decorativo Bordado', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, description: 'Cojín con hermoso bordado artesanal.', stock: 15, discount: 0 },
    { id: 28, name: 'Manta de Algodón Orgánico', price: 79.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, description: 'Suave manta de algodón 100% orgánico.', stock: 7, discount: 10 },
    { id: 29, name: 'Tapiz de Pared Tejido a Mano', price: 89.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Hermoso tapiz para decorar paredes.', stock: 4, discount: 0 },
    { id: 30, name: 'Juego de Toallas de Baño', price: 54.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, description: 'Set de 3 toallas suaves y absorbentes.', stock: 10, discount: 15 },
    { id: 31, name: 'Mantel de Lino', price: 69.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, description: 'Elegante mantel de lino para mesa.', stock: 6, discount: 0 },
    { id: 32, name: 'Cortinas de Algodón', price: 99.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Par de cortinas de algodón natural.', stock: 5, discount: 20 },
    { id: 33, name: 'Alfombra Tejida a Mano', price: 129.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Alfombra artesanal de lana.', stock: 3, discount: 0 },
    { id: 34, name: 'Funda de Almohada de Seda', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Lujosa funda de almohada de seda.', stock: 8, discount: 5 },
    { id: 35, name: 'Camino de Mesa Bordado', price: 49.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Camino de mesa con bordados artesanales.', stock: 7, discount: 0 },
    { id: 36, name: 'Manta de Punto', price: 84.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Acogedora manta tejida a mano.', stock: 6, discount: 10 },
    { id: 37, name: 'Set de Individuales', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Set de 4 individuales de tela.', stock: 12, discount: 0 },
    { id: 38, name: 'Funda Nórdica Estampada', price: 89.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Funda nórdica con estampado artesanal.', stock: 5, discount: 15 },
    { id: 39, name: 'Cojín de Suelo', price: 59.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, description: 'Gran cojín decorativo para el suelo.', stock: 4, discount: 0 },
];

let cart = [];
let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    setupCarousel();
    setupTopBanner();
});

function loadProducts() {
    const featuredContainer = document.getElementById('featured-products');
    const productGrid = document.getElementById('product-grid');

    products.forEach(product => {
        const productElement = createProductElement(product);
        
        if (product.featured) {
            featuredContainer.appendChild(productElement.cloneNode(true));
        }
        
        productGrid.appendChild(productElement);
    });
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded-lg shadow-md hover-grow';
    
    const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
    
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
        <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${product.description}</p>
        <div class="flex justify-between items-center mb-2">
            <span class="text-primary font-bold">$${discountedPrice.toFixed(2)}</span>
            ${product.discount > 0 ? `<span class="text-sm text-gray-500 line-through">$${product.price.toFixed(2)}</span>` : ''}
        </div>
        <p class="text-sm ${product.stock > 0 ? 'text-green-500' : 'text-red-500'} mb-2">
            ${product.stock > 0 ? `En stock: ${product.stock}` : 'Agotado'}
        </p>
        <button class="bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                onclick="addToCart(${product.id})" 
                ${product.stock === 0 ? 'disabled' : ''}>
            Agregar al carrito
        </button>
    `;
    
    return div;
}

function setupEventListeners() {
    const cartButton = document.getElementById('cart-button');
    const closeCart = document.getElementById('close-cart');
    const cartModal = document.getElementById('cart-modal');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const categoryFilters = document.getElementById('category-filters');
    const searchInput = document.getElementById('search-input');
    const cartNext1 = document.getElementById('cart-next-1');
    const cartNext2 = document.getElementById('cart-next-2');

    cartButton.addEventListener('click', () => {
        updateCart();
        cartModal.classList.remove('hidden');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    categoryFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const category = e.target.dataset.category;
            filterProducts(category);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterProducts('all', searchTerm);
    });

    cartNext1.addEventListener('click', () => {
        if (cart.length > 0) {
            goToStep(2);
        } else {
            alert('El carrito está vacío. Agrega productos antes de continuar.');
        }
    });

    cartNext2.addEventListener('click', () => {
        const form = document.getElementById('customer-info-form');
        if (form.checkValidity()) {
            goToStep(3);
        } else {
            alert('Por favor, completa todos los campos requeridos.');
        }
    });

    window.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('animate-fade-in');
            }
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        product.stock--;
        updateCartCount();
        updateProductGrid();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-2';
        itemElement.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
}

function filterProducts(category, searchTerm = '') {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        if ((category === 'all' || product.category === category) &&
            (searchTerm === '' || product.name.toLowerCase().includes(searchTerm))) {
            productGrid.appendChild(createProductElement(product));
        }
    });
}

function updateProductGrid() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        productGrid.appendChild(createProductElement(product));
    });
}

function setupCarousel() {
    const carousel = document.getElementById('ad-carousel');
    const images = [
        'https://via.placeholder.com/1200x400?text=Oferta+Especial',
        'https://via.placeholder.com/1200x400?text=Nuevos+Productos',
        'https://via.placeholder.com/1200x400?text=Envío+Gratis'
    ];
    
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Ad ${index + 1}`;
        img.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        carousel.appendChild(img);
    });
    
    let currentSlide = 0;
    setInterval(() => {
        const slides = carousel.querySelectorAll('img');
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
    }, 5000);
}

function setupTopBanner() {
    const bannerSlides = document.querySelectorAll('.top-banner-slide');
    let currentSlide = 0;
    
    setInterval(() => {
        bannerSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % bannerSlides.length;
        bannerSlides[currentSlide].classList.add('active');
    }, 5000);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function goToStep(step) {
    currentStep = step;
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`cart-step-${i}`).classList.add('hidden');
    }
    document.getElementById(`cart-step-${step}`).classList.remove('hidden');

    if (step === 3) {
        updateOrderSummary();
        setupMercadoPago();
    }
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const customerName = document.getElementById('customer-name').value;
    const customerWhatsApp = document.getElementById('customer-whatsapp').value;
    const customerEmail = document.getElementById('customer-email').value;

    let summaryHTML = `
        <h3 class="font-bold mb-2">Resumen del Pedido</h3>
        <p><strong>Nombre:</strong> ${customerName}</p>
        <p><strong>WhatsApp:</strong> ${customerWhatsApp}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <h4 class="font-bold mt-4 mb-2">Productos:</h4>
    `;

    let total = 0;
    cart.forEach(item => {
        summaryHTML += `<p>${item.name} x ${item.quantity}: $${(item.price * item.quantity).toFixed(2)}</p>`;
        total += item.price * item.quantity;
    });

    summaryHTML += `<p class="font-bold mt-2">Total: $${total.toFixed(2)}</p>`;
    orderSummary.innerHTML = summaryHTML;
}

function setupMercadoPago() {
    const mp = new MercadoPago(MERCADOPAGO_PUBLIC_KEY);
    const bricksBuilder = mp.bricks();

    const renderPaymentButton = async (bricksBuilder) => {
        const settings = {
            initialization: {
                amount: calculateTotal(),
            },
            callbacks: {
                onReady: () => {
                    console.log('MercadoPago button ready');
                },
                onSubmit: (cardFormData) => {
                    // Aquí puedes manejar el envío del formulario
                    console.log('Payment submitted:', cardFormData);
                },
                onError: (error) => {
                    console.error('MercadoPago error:', error);
                },
            },
        };

        window.paymentBrickController = await bricksBuilder.create(
            'payment',
            'mercadopago-button-container',
            settings
        );
    };

    renderPaymentButton(bricksBuilder);
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Función para simular el envío de la orden (reemplazar con lógica real más adelante)
function sendOrder() {
    const customerName = document.getElementById('customer-name').value;
    const customerWhatsApp = document.getElementById('customer-whatsapp').value;
    const customerEmail = document.getElementById('customer-email').value;

    const orderDetails = {
        customer: {
            name: customerName,
            whatsapp: customerWhatsApp,
            email: customerEmail
        },
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: calculateTotal()
    };

    console.log('Orden enviada:', orderDetails);
    // Aquí iría la lógica para enviar la orden al servidor
    alert('¡Gracias por tu compra! Te contactaremos pronto para confirmar los detalles.');
    
    // Limpiar el carrito y cerrar el modal
    cart = [];
    updateCartCount();
    document.getElementById('cart-modal').classList.add('hidden');
}