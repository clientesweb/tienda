// Simulación de datos de productos
const products = [
    // Velas
    { id: 1, name: 'Vela Aromática Lavanda', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 10 },
    { id: 2, name: 'Vela de Soja Natural', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 15 },
    { id: 3, name: 'Set de Velas Decorativas', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 8 },
    { id: 4, name: 'Vela en Tarro de Cristal', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 12 },
    { id: 5, name: 'Vela Perfumada de Vainilla', price: 22.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 20 },
    // ... (resto de los productos)
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
            
            const discount = Math.random() < 0.3 ? Math.floor(Math.random() * 30) + 10 : 0; // 30% de probabilidad de descuento entre 10% y 40%
            const discountedPrice = product.price * (1 - discount / 100);
            
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2 text-primary">${product.name}</h3>
                    <p class="text-dark ${discount > 0 ? 'line-through' : ''}">${product.price.toFixed(2)}€</p>
                    ${discount > 0 ? `<p class="text-accent font-bold">${discountedPrice.toFixed(2)}€ (-${discount}%)</p>` : ''}
                    <p class="text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}">${product.stock > 0 ? 'En stock' : 'Agotado'}</p>
                    <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                            onclick="addToCart(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                    </button>
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
        
        const discount = Math.random() < 0.3 ? Math.floor(Math.random() * 30) + 10 : 0;
        const discountedPrice = product.price * (1 - discount / 100);
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="text-md font-semibold mb-2 text-primary">${product.name}</h4>
                <p class="text-sm text-dark ${discount > 0 ? 'line-through' : ''}">${product.price.toFixed(2)}€</p>
                ${discount > 0 ? `<p class="text-sm text-accent font-bold">${discountedPrice.toFixed(2)}€ (-${discount}%)</p>` : ''}
                <p class="text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}">${product.stock > 0 ? 'En stock' : 'Agotado'}</p>
                <button class="mt-2 bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-accent transition duration-300 w-full ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                        onclick="addToCart(${product.id})"
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                </button>
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
        
        const discount = Math.random() < 0.3 ? Math.floor(Math.random() * 30) + 10 : 0;
        const discountedPrice = product.price * (1 - discount / 100);
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-primary">${product.name}</h3>
                <p class="text-dark ${discount > 0 ? 'line-through' : ''}">${product.price.toFixed(2)}€</p>
                ${discount > 0 ? `<p class="text-accent font-bold">${discountedPrice.toFixed(2)}€ (-${discount}%)</p>` : ''}
                <p class="text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}">${product.stock > 0 ? 'En stock' : 'Agotado'}</p>
                <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                        onclick="addToCart(${product.id})"
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                </button>
            </div>
        `;
        productGrid.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
        } else {
            showNotification('No hay más stock disponible para este producto');
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    product.stock -= 1;
    updateCartCount();
    showNotification('Producto agregado al carrito');
    loadProducts(); // Actualizar la visualización de los productos
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
                <p class="text-sm">Precio: ${item.price.toFixed(2)}€</p>
            </div>
            <div>
                <p class="font-semibold">${(item.price * item.quantity).toFixed(2)}€</p>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">Eliminar</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `${total.toFixed(2)}€`;
    cartModal.classList.remove('hidden');

    createMercadoPagoButton(total);
}

function hideCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;

    cartModal.classList.add('hidden');
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        const product = products.find(p => p.id === productId);
        if (product) {
            product.stock += item.quantity;
        }
        cart.splice(itemIndex, 1);
    }
    updateCartCount();
    showCart();
    showNotification('Producto eliminado del carrito');
    loadProducts(); // Actualizar la visualización de los productos
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
            'img/hero2.png',
            'img/hero3.png'
        ];

        let currentHeroSlide = 0;

        setInterval(() => {
            heroCarousel.style.opacity = '0';
            setTimeout(() => {
                currentHeroSlide = (currentHeroSlide + 1) % heroImages.length;
                heroCarousel.style.backgroundImage = `url('${heroImages[currentHeroSlide]}')`;
                heroCarousel.style.opacity = '1';
            }, 500);
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