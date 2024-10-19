// Simulación de datos de productos
let products = [
    // Velas
    { id: 1, name: 'Vela Aromática Lavanda', price: 1999, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 10, description: 'Vela aromática de lavanda para relajación y aromaterapia.' },
    { id: 2, name: 'Vela de Soja Natural', price: 2499, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 15, description: 'Vela ecológica hecha de soja 100% natural.' },
    { id: 3, name: 'Set de Velas Decorativas', price: 3499, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 8, description: 'Set de 3 velas decorativas para crear ambiente.' },
    { id: 4, name: 'Vela en Tarro de Cristal', price: 2999, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 12, description: 'Elegante vela en tarro de cristal reutilizable.' },
    { id: 5, name: 'Vela Perfumada de Vainilla', price: 2299, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 20, description: 'Vela con aroma a vainilla para un ambiente acogedor.' },
    { id: 6, name: 'Vela de Cera de Abeja', price: 2799, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 10, description: 'Vela natural hecha con cera de abeja pura.' },
    { id: 7, name: 'Vela Flotante', price: 1599, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 25, description: 'Set de velas flotantes para decoración de eventos.' },
    { id: 8, name: 'Vela de Masaje', price: 3299, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 8, description: 'Vela de masaje con aceites esenciales.' },
    { id: 9, name: 'Vela Citronela', price: 1899, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 30, description: 'Vela de citronela para exteriores, repele insectos.' },
    { id: 10, name: 'Vela de Meditación', price: 2599, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 15, description: 'Vela especial para meditación y relajación.' },
    { id: 11, name: 'Vela de Cumpleaños', price: 999, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 50, description: 'Set de velas decorativas para pasteles de cumpleaños.' },
    { id: 12, name: 'Vela de Emergencia', price: 1499, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 40, description: 'Vela de larga duración para situaciones de emergencia.' },
    
    // Cerámica
    { id: 13, name: 'Tazón de Cerámica Artesanal', price: 3999, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 7, description: 'Tazón hecho a mano con diseño único.' },
    { id: 14, name: 'Plato Decorativo de Cerámica', price: 4499, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 5, description: 'Plato decorativo con motivos florales pintados a mano.' },
    { id: 15, name: 'Jarrón de Cerámica Pintado', price: 5999, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, stock: 3, description: 'Jarrón de cerámica con diseño abstracto pintado a mano.' },
    { id: 16, name: 'Set de Tazas de Café', price: 4999, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 10, description: 'Set de 4 tazas de café de cerámica con diseños variados.' },
    { id: 17, name: 'Maceta de Cerámica', price: 2999, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, stock: 15, description: 'Maceta de cerámica para plantas de interior.' },
    { id: 18, name: 'Cuenco de Cerámica', price: 2499, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 20, description: 'Cuenco de cerámica multiusos con glaseado artesanal.' },
    { id: 19, name: 'Tetera de Cerámica', price: 5499, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, stock: 8, description: 'Tetera de cerámica con filtro incorporado.' },
    { id: 20, name: 'Figura Decorativa de Cerámica', price: 3799, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 12, description: 'Figura decorativa de cerámica para el hogar.' },
    { id: 21, name: 'Portavelas de Cerámica', price: 1999, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, stock: 25, description: 'Portavelas de cerámica con diseño calado.' },
    { id: 22, name: 'Plato de Sushi de Cerámica', price: 3299, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 15, description: 'Plato rectangular de cerámica para servir sushi.' },
    { id: 23, name: 'Azucarera de Cerámica', price: 2799, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, stock: 18, description: 'Azucarera de cerámica con tapa y cucharita.' },
    { id: 24, name: 'Florero de Cerámica', price: 4299, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 10, description: 'Florero de cerámica con diseño moderno y elegante.' },
    
    // Textiles
    { id: 25, name: 'Cojín Decorativo de Algodón', price: 2999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 15, description: 'Cojín decorativo de algodón orgánico con diseño geométrico.' },
    { id: 26, name: 'Manta Tejida a Mano', price: 7999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 6, description: 'Manta suave y cálida tejida a mano con lana de alpaca.' },
    { id: 27, name: 'Cortinas de Lino Natural', price: 8999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, stock: 4, description: 'Par de cortinas de lino natural con acabado rústico.' },
    { id: 28, name: 'Tapete de Yute Redondo', price: 6999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 8, description: 'Tapete redondo de yute trenzado, perfecto para decoración boho.' },
    { id: 29, name: 'Mantel de Algodón', price: 4999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, stock: 12, description: 'Mantel de algodón con bordados artesanales.' },
    { id: 30, name: 'Toalla de Baño de Bambú', price: 3499, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 20, description: 'Toalla de baño suave y absorbente hecha de fibra de bambú.' },
    { id: 31, name: 'Camino de Mesa Bordado', price: 3999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, stock: 15, description: 'Camino de mesa con hermosos bordados hechos a mano.' },
    { id: 32, name: 'Funda de Almohada de Seda', price: 2499, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 25, description: 'Funda de almohada de seda pura para un descanso lujoso.' },
    { id: 33, name: 'Tapiz de Pared', price: 5999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 10, description: 'Tapiz de pared tejido a mano con diseño bohemio.' },
    { id: 34, name: 'Set de Servilletas de Lino', price: 2999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, stock: 30, description: 'Set de 6 servilletas de lino con bordes deshilachados.' },
    { id: 35, name: 'Alfombra de Lana', price: 9999, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 5, description: 'Alfombra de lana tejida a mano con diseño étnico.' },
    { id: 36, name: 'Cortina de Ducha de Algodón', price: 4499, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, stock: 18, description: 'Cortina de ducha de algodón con estampado botánico.' }
];

let cart = [];
let currentPage = 1;
const productsPerPage = 8;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    updateCartCount();
    setupTopBanner();
    setupAdCarousel();
});

function loadProducts() {
    const featuredContainer = document.getElementById('featured-products');
    const productGrid = document.getElementById('product-grid');
    
    featuredContainer.innerHTML = '';
    productGrid.innerHTML = '';

    const featuredProducts = products.filter(product => product.featured);
    featuredProducts.forEach(product => {
        featuredContainer.appendChild(createProductCard(product));
    });

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    currentProducts.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });

    updatePaginationButtons();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover-grow';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-2">$${product.price.toFixed(2)}</p>
            <p class="text-sm text-gray-500 mb-4">${product.description}</p>
            <button class="add-to-cart bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full" data-id="${product.id}">
                Agregar al carrito
            </button>
        </div>
    `;
    return card;
}

function setupEventListeners() {
    document.getElementById('cart-button').addEventListener('click', toggleCart);
    document.getElementById('close-cart').addEventListener('click', toggleCart);
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    document.getElementById('category-filters').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const category = e.target.getAttribute('data-category');
            filterProducts(category);
        }
    });
    document.getElementById('search-input').addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
    document.getElementById('prev-products').addEventListener('click', () => changePage(-1));
    document.getElementById('next-products').addEventListener('click', () => changePage(1));
    document.getElementById('menu-toggle').addEventListener('click', toggleMobileMenu);
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
        showNotification(`${product.name} agregado al carrito`);
        updateCart();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('hidden');
    if (!cartModal.classList.contains('hidden')) {
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-2';
        itemElement.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    updateMercadoPagoButton(total);
}

function updateMercadoPagoButton(total) {
    const mp = new MercadoPago(MERCADOPAGO_PUBLIC_KEY);
    const bricksBuilder = mp.bricks();

    const renderComponent = async (bricksBuilder) => {
        if (document.getElementById('mercadopago-button-container').firstChild) {
            document.getElementById('mercadopago-button-container').innerHTML = '';
        }

        await bricksBuilder.create(
            'wallet',
            'mercadopago-button-container',
            {
                initialization: {
                    preferenceId: await createPreference(total),
                },
                callbacks: {
                    onSubmit: () => {
                        // Aquí puedes agregar lógica adicional antes de redirigir al checkout
                    },
                    onReady: () => {
                        // El botón está listo para usarse
                    },
                    onError: (error) => {
                        console.error('Error en el botón de MercadoPago:', error);
                    },
                },
            }
        );
    };

    renderComponent(bricksBuilder);
}

async function createPreference(total) {
    // Esta función debería hacer una llamada a tu backend para crear una preferencia
    // Por ahora, simularemos una respuesta
    return 'SIMULATED_PREFERENCE_ID';
}

function filterProducts(category) {
    currentPage = 1;
    if (category === 'all') {
        loadProducts();
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            productGrid.appendChild(createProductCard(product));
        });
    }
}

function searchProducts(query) {
    currentPage = 1;
    const lowercaseQuery = query.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.description.toLowerCase().includes(lowercaseQuery)
    );
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });
}

function changePage(direction) {
    currentPage += direction;
    loadProducts();
}

function updatePaginationButtons() {
    const prevButton = document.getElementById('prev-products');
    const nextButton = document.getElementById('next-products');
    
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * productsPerPage >= products.length;
    
    prevButton.classList.toggle('opacity-50', prevButton.disabled);
    nextButton.classList.toggle('opacity-50', nextButton.disabled);
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

function setupTopBanner() {
    const bannerSlides = document.querySelectorAll('.top-banner-slide');
    let currentSlide = 0;

    function showNextSlide() {
        bannerSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % bannerSlides.length;
        bannerSlides[currentSlide].classList.add('active');
    }

    setInterval(showNextSlide, 5000);
}

function setupAdCarousel() {
    const adCarousel = document.getElementById('ad-carousel');
    const adImages = [
        'https://via.placeholder.com/1200x400?text=Oferta+Especial',
        'https://via.placeholder.com/1200x400?text=Nuevos+Productos',
        'https://via.placeholder.com/1200x400?text=Envío+Gratis'
    ];

    adImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Anuncio ${index + 1}`;
        img.className = 'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000';
        img.style.opacity = index === 0 ? '1' : '0';
        adCarousel.appendChild(img);
    });

    let currentAd = 0;
    setInterval(() => {
        const images = adCarousel.querySelectorAll('img');
        images[currentAd].style.opacity = '0';
        currentAd = (currentAd + 1) % images.length;
        images[currentAd].style.opacity = '1';
    }, 5000);
}

// Animación de elementos al hacer scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('animate-fade-in');
        }
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}