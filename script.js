// Simulación de datos de productos
const products = [
    { id: 1, name: 'Vela Aromática Lavanda', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true },
    { id: 2, name: 'Vela de Soja Natural', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true },
    { id: 3, name: 'Set de Velas Decorativas', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 4, name: 'Vela en Tarro de Cristal', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false },
    { id: 5, name: 'Vela Perfumada de Vainilla', price: 22.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true },
    { id: 6, name: 'Tazón de Cerámica Artesanal', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 7, name: 'Plato Decorativo de Cerámica', price: 44.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 8, name: 'Jarrón de Cerámica Pintado a Mano', price: 59.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false },
    { id: 9, name: 'Set de Tazas de Café de Cerámica', price: 49.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 10, name: 'Maceta de Cerámica Decorativa', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true },
    { id: 11, name: 'Cojín Decorativo de Algodón', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
    { id: 12, name: 'Manta Tejida a Mano', price: 79.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
    { id: 13, name: 'Cortinas de Lino Natural', price: 89.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false },
    { id: 14, name: 'Tapete de Yute Redondo', price: 69.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
    { id: 15, name: 'Set de Toallas de Algodón Orgánico', price: 54.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true },
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
                    <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300" onclick="addToCart(${product.id})">Agregar al carrito</button>
                </div>
            `;
            productGrid.appendChild(productElement);
        }
    });
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featuredProducts = products.filter(product => product.featured);
    featuredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="text-md font-semibold mb-2 text-primary">${product.name}</h4>
                <p class="text-sm text-dark">$${product.price.toFixed(2)}</p>
                <button class="mt-2 bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-accent transition duration-300" onclick="addToCart(${product.id})">Agregar al carrito</button>
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
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    [searchInput, mobileSearchInput].forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) || 
                    product.category.toLowerCase().includes(searchTerm)
                );
                displaySearchResults(filteredProducts);
            });
        }
    });
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
                <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300" onclick="addToCart(${product.id})">Agregar al carrito</button>
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
        itemElement.className = 'flex justify-between items-center mb-2';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartModal.classList.remove('hidden');
    cartModal.classList.add('flex');
}

function hideCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;

    cartModal.classList.remove('flex');
    cartModal.classList.add('hidden');
}

function animateTopBanner() {
    const topBanner = document.getElementById('top-banner');
    if (!topBanner) return;

    topBanner.classList.add('slide-in');
}

function handleHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }

    // Auto-rotate slides
    setInterval(nextSlide, 5000);
}

// Configuración de MercadoPago
const mp = new MercadoPago('TEST-12345678-1234-1234-1234-123456789012');

function createPreference() {
    const items = cart.map(item => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
    }));

    return fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer TEST-1234567890123456-123456-1234567890abcdef1234567890abcdef-123456789',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: items,
            back_urls: {
                success: window.location.href + "?status=success",
                failure: window.location.href + "?status=failure",
                pending: window.location.href + "?status=pending"
            },
            auto_return: "approved"
        })
    })
    .then(response => response.json());
}

function initMercadoPago() {
    createPreference().then(preference => {
        mp.checkout({
            preference: {
                id: preference.id
            },
            render: {
                container: '#mercadopago-button-container',
                label: 'Pagar con MercadoPago',
            }
        });
    }).catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadFeaturedProducts();
    handleProductFilters();
    handleSearch();
    animateTopBanner();
    handleHeroCarousel();

    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-button');

    if (cartButton) cartButton.addEventListener('click', showCart);
    if (closeCartButton) closeCartButton.addEventListener('click', hideCart);
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            hideCart();
            initMercadoPago();
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});