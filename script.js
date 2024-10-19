// Simulación de datos de productos
const products = [
    // Velas
    { id: 1, name: 'Vela Aromática Lavanda', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true },
    { id: 2, name: 'Vela de Soja Natural', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true },
    { id: 3, name: 'Set de Velas Decorativas', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 4, name: 'Vela en Tarro de Cristal', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 5, name: 'Vela Perfumada de Vainilla', price: 22.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true },
    { id: 6, name: 'Vela de Cera de Abeja', price: 27.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 7, name: 'Vela Flotante', price: 15.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 8, name: 'Vela de Citronela', price: 18.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 9, name: 'Vela de Masaje', price: 32.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 10, name: 'Vela de Sándalo', price: 26.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 11, name: 'Vela de Té', price: 12.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 12, name: 'Vela de Eucalipto', price: 23.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 13, name: 'Vela de Jazmín', price: 25.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 14, name: 'Vela de Canela', price: 21.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 15, name: 'Vela de Menta', price: 20.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },

    // Cerámica
    { id: 16, name: 'Tazón de Cerámica Artesanal', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 17, name: 'Plato Decorativo de Cerámica', price: 44.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 18, name: 'Jarrón de Cerámica Pintado a Mano', price: 59.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 19, name: 'Set de Tazas de Café de Cerámica', price: 49.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 20, name: 'Maceta de Cerámica Decorativa', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 21, name: 'Cuenco de Cerámica', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 22, name: 'Florero de Cerámica', price: 54.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 23, name: 'Plato de Sushi de Cerámica', price: 37.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 24, name: 'Tetera de Cerámica', price: 64.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 25, name: 'Azucarero de Cerámica', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 26, name: 'Salero y Pimentero de Cerámica', price: 32.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 27, name: 'Bandeja de Cerámica', price: 47.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 28, name: 'Jarra de Cerámica', price: 42.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 29, name: 'Portavelas de Cerámica', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 30, name: 'Escultura de Cerámica', price: 79.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },

    // Textiles
    { id: 31, name: 'Cojín Decorativo de Algodón', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
    { id: 32, name: 'Manta Tejida a Mano', price: 79.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
    { id: 33, name: 'Cortinas de Lino Natural', price: 89.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 34, name: 'Tapete de Yute Redondo', price: 69.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
    { id: 35, name: 'Set de Toallas de Algodón Orgánico', price: 54.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
    { id: 36, name: 'Mantel de Lino', price: 49.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 37, name: 'Alfombra de Lana', price: 129.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 38, name: 'Funda de Cojín Bordada', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 39, name: 'Camino de Mesa', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 40, name: 'Cortina de Ducha de Algodón', price: 44.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 41, name: 'Tapiz de Pared', price: 84.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 42, name: 'Funda Nórdica', price: 99.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 43, name: 'Cojín de Suelo', price: 59.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 44, name: 'Manta de Sofá', price: 74.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 45, name: 'Set de Servilletas de Tela', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
];

let cart = [];

function loadProducts(category = 'all') {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    products.forEach(product => {
        if (category === 'all' || product.category === category) {
            const productElement = document.createElement('div');
            productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2 text-primary">${product.name}</h3>
                    <p class="text-dark">$${product.price.toFixed(2)}</p>
                    <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full" onclick="addToCart(${product.id})">Agregar al carrito</button>
                </div>
            `;
            productGrid.appendChild(productElement);
        }
    });
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    featuredContainer.innerHTML = '';

    const featuredProducts = products.filter(product => product.featured);
    featuredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="text-md font-semibold mb-2 text-primary">${product.name}</h4>
                <p class="text-sm text-dark">$${product.price.toFixed(2)}</p>
                <button class="mt-2 bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-accent transition duration-300 w-full" onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        `;
        featuredContainer.appendChild(productElement);
    });
}

function handleProductFilters() {
    const filterButtons = document.querySelectorAll('#category-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadProducts(category);
            
            filterButtons.forEach(btn => btn.classList.remove('bg-primary', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-secondary', 'text-dark'));
            button.classList.remove('bg-secondary', 'text-dark');
            button.classList.add('bg-primary', 'text-white');
        });
    });
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm)
            );
            displaySearchResults(filteredProducts);
        });
    }
}

function displaySearchResults(filteredProducts) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="text-center text-gray-500">No se encontraron productos.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-primary">${product.name}</h3>
                <p class="text-dark">$${product.price.toFixed(2)}</p>
                <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full" onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        `;
        productGrid.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    showNotification('Producto agregado al carrito');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartModal || !cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-2 pb-2 border-b';
        itemElement.innerHTML = `
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-sm">Cantidad: ${item.quantity}</p>
                <p class="text-sm">Precio: $${item.price.toFixed(2)}</p>
            </div>
            <div>
                <p class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">Eliminar</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartModal.classList.remove('hidden');

    createMercadoPagoButton(total);
}

function hideCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;

    cartModal.classList.add('hidden');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart();
    showNotification('Producto eliminado del carrito');
}

async function createMercadoPagoButton(total) {
    const mp = new MercadoPago(MERCADOPAGO_PUBLIC_KEY);
    
    const buttonContainer = document.getElementById('mercadopago-button-container');
    buttonContainer.innerHTML = ''; // Limpiar el contenedor antes de crear un nuevo botón

    try {
        const response = await fetch('/.netlify/functions/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart.map(item => ({
                    title: item.name,
                    quantity: item.quantity,
                    currency_id: 'ARS',
                    unit_price: item.price
                }))
            })
        });

        if (!response.ok) {
            throw new Error('Error al crear la preferencia de MercadoPago');
        }

        const preference = await response.json();

        mp.checkout({
            preference: {
                id: preference.id
            },
            render: {
                container: '#mercadopago-button-container',
                label: 'Pagar con Mercado Pago'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su pago. Por favor, inténtelo de nuevo.');
    }
}

function animateTopBanner() {
    const topBanner = document.getElementById('top-banner');
    if (!topBanner) return;

    const slides = topBanner.querySelectorAll('.top-banner-slide');
    let currentSlide = 0;

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

function initCarousels() {
    const heroCarousel = document.getElementById('hero');
    const adCarousel = document.getElementById('ad-carousel');

    if (heroCarousel) {
        const heroImages = [
            'img/hero1.png',
            'img/hero.png',
            'img/hero3.png'
        ];

        let currentHeroSlide = 0;

        setInterval(() => {
            currentHeroSlide = (currentHeroSlide + 1) % heroImages.length;
            heroCarousel.style.backgroundImage = `url('${heroImages[currentHeroSlide]}')`;
        }, 5000);
    }

    if (adCarousel) {
        const adImages = [
            'https://via.placeholder.com/1200x400?text=Oferta+Especial',
            'https://via.placeholder.com/1200x400?text=Nueva+Colección',
            'https://via.placeholder.com/1200x400?text=Descuentos+de+Temporada'
        ];

        adImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Ad ${index + 1}`;
            img.className = `w-full h-full object-cover carousel-item ${index === 0 ? 'active' : ''}`;
            adCarousel.appendChild(img);
        });

        const adSlides = adCarousel.querySelectorAll('.carousel-item');
        let currentAdSlide = 0;

        setInterval(() => {
            adSlides[currentAdSlide].classList.remove('active');
            currentAdSlide = (currentAdSlide + 1) % adSlides.length;
            adSlides[currentAdSlide].classList.add('active');
        }, 5000);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full opacity-0 transition-opacity duration-300';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('opacity-0');
    }, 100);

    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadFeaturedProducts();
    handleProductFilters();
    handleSearch();
    animateTopBanner();
    initCarousels();

    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (cartButton) {
        cartButton.addEventListener('click', showCart);
    }

    if (closeCartButton) {
        closeCartButton.addEventListener('click', hideCart);
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Animación de elementos al hacer scroll
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});