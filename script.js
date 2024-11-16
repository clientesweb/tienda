// Simulación de datos de productos
const products = [
    // Velas (12 productos)
    { id: 1, name: 'Vitrè cera de soja aromatizada', price: 10700, image: 'img/velas1.png', category: 'velas', featured: true, description: 'Envase de vidrio reutilizable - 100gr.', onSale: false, inStock: true },
    { id: 2, name: 'Croques', price: 9800, image: 'img/velas2.png', category: 'velas', featured: true, description: 'Envase reutilizable de vidrio con tapa - 70 gr de cera de soja aromatizada', onSale: false, inStock: true },
    { id: 3, name: 'Dinan', price: 15600, image: 'img/velas3.png', category: 'velas', featured: false, description: 'Envase reutilizable de vidrio con tapa. 200 gr de cera de soja aromatizada.', onSale: false, inStock: false },
    { id: 4, name: 'Saignon', price: 53000, image: 'img/velas11.png', category: 'velas', featured: false, description: 'Velón suspendido en envase reutilizable de vidrio. 500 gr de cera de soja aromatizada.', onSale: false, inStock: true },
    { id: 5, name: 'Lottie Pequeño', price: 6400, image: 'img/velas4.png', category: 'velas', featured: false, description: 'Cuenco de 8cm de diámetro reutilizable de madera. 100 gr de cera de soja aromatizada.', onSale: false, inStock: true },
    { id: 6, name: 'Lottie Mediano', price: 8400, image: 'img/velas10.png', category: 'velas', featured: true, description: 'Cuenco de 12 cm de diámetro reutilizable de madera . 200 gr de cera de soja aromatizada (doble pabilo).', onSale: false, inStock: true },
    { id: 7, name: 'Sèlène x3', price: 11400, image: 'img/velas6.png', category: 'velas', featured: false, description: '', onSale: false, inStock: true },
    { id: 8, name: 'Bombones Marie', price: 2500, image: 'img/producto.png', category: 'velas', featured: false, description: '5 mini bombones de cera de soja perfumados.', onSale: false, inStock: true },
    { id: 9, name: 'Jolie con flor', price: 7800, image: 'img/velas12.png', category: 'velas', featured: true, description: 'Cuenco reutilizable de madera con 150gr. De cera de soja aromatizada', onSale: true, inStock: true },
    { id: 10, name: 'Yanis Grande', price: 5300, image: 'img/velas5.png', category: 'velas', featured: false, description: '', onSale: true, inStock: true },
    { id: 11, name: 'Yanis Pequeña x3', price: 5700, image: 'img/velas8.png', category: 'velas', featured: false, description: '', onSale: false, inStock: true },
    { id: 12, name: 'Teva x3', price: 10800, image: 'img/velas7.png', category: 'velas', featured: false, description: '', onSale: false, inStock: true },

    // Textiles (10 productos)
    { id: 13, name: 'Manta de Algodón', price: 49.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: true, description: 'Manta suave de algodón 100% natural.', onSale: true, inStock: true },
    { id: 14, name: 'Cojín Decorativo', price: 29.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: false, description: 'Cojín decorativo con diseños únicos.', onSale: false, inStock: true },
    { id: 15, name: 'Cortinas de Lino', price: 79.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: true, description: 'Cortinas de lino natural para tu hogar.', onSale: false, inStock: true },
    { id: 16, name: 'Mantel de Mesa', price: 39.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: false, description: 'Mantel elegante para tu mesa de comedor.', onSale: true, inStock: true },
    { id: 17, name: 'Toallas de Baño', price: 34.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: false, description: 'Set de toallas suaves y absorbentes.', onSale: false, inStock: true },
    { id: 18, name: 'Alfombra de Yute', price: 89.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: true, description: 'Alfombra natural de yute para tu sala.', onSale: false, inStock: true },
    { id: 19, name: 'Funda de Almohada', price: 19.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: false, description: 'Funda de almohada de algodón suave.', onSale: true, inStock: true },
    { id: 20, name: 'Tapiz de Pared', price: 59.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: false, description: 'Tapiz decorativo para colgar en la pared.', onSale: false, inStock: true },
    { id: 21, name: 'Camino de Mesa', price: 29.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: false, description: 'Camino de mesa elegante para ocasiones especiales.', onSale: false, inStock: true },
    { id: 22, name: 'Cortina de Ducha', price: 44.99, image: '/placeholder.svg?height=300&width=300', category: 'textiles', featured: false, description: 'Cortina de ducha con diseño moderno.', onSale: true, inStock: true },

    // Cerámica (10 productos)
    { id: 23, name: 'Taza de Café', price: 14.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: true, description: 'Taza de café de cerámica artesanal.', onSale: true, inStock: true },
    { id: 24, name: 'Plato Decorativo', price: 29.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: false, description: 'Plato decorativo de cerámica pintada a mano.', onSale: false, inStock: true },
    { id: 25, name: 'Jarrón de Cerámica', price: 39.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: true, description: 'Jarrón de cerámica para decoración del hogar.', onSale: false, inStock: true },
    { id: 26, name: 'Set de Platos', price: 59.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: false, description: 'Set de 4 platos de cerámica para comedor.', onSale: true, inStock: true },
    { id: 27, name: 'Maceta de Cerámica', price: 24.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: false, description: 'Maceta de cerámica para plantas de interior.', onSale: false, inStock: true },
    { id: 28, name: 'Cuenco de Cerámica', price: 19.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: true, description: 'Cuenco de cerámica para servir alimentos.', onSale: false, inStock: true },
    { id: 29, name: 'Tetera de Cerámica', price: 34.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: false, description: 'Tetera de cerámica con diseño elegante.', onSale: true, inStock: true },
    { id: 30, name: 'Portavelas de Cerámica', price: 16.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: false, description: 'Portavelas de cerámica para velas pequeñas.', onSale: false, inStock: true },
    { id: 31, name: 'Figura Decorativa', price: 44.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: false, description: 'Figura decorativa de cerámica para el hogar.', onSale: false, inStock: true },
    { id: 32, name: 'Azucarero de Cerámica', price: 22.99, image: '/placeholder.svg?height=300&width=300', category: 'ceramica', featured: false, description: 'Azucarero de cerámica con tapa.', onSale: true, inStock: true }
];

let cart = [];
let currentStep = 1;

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
                    <p class="text-sm text-gray-600 mb-2">${product.description}</p>
                    <p class="text-dark ${product.onSale ? 'line-through' : ''}">${product.onSale ? `$${(product.price * 1.2).toFixed(2)}` : `$${product.price.toFixed(2)}`}</p>
                    ${product.onSale ? `<p class="text-accent font-bold">Oferta: $${product.price.toFixed(2)}</p>` : ''}
                    <p class="text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}">${product.inStock ? 'En stock' : 'Agotado'}</p>
                    <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Agregar al carrito' : 'Agotado'}
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
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="text-md font-semibold mb-2 text-primary">${product.name}</h4>
                <p class="text-sm text-gray-600 mb-2">${product.description}</p>
                <p class="text-sm text-dark ${product.onSale ? 'line-through' : ''}">${product.onSale ? `$${(product.price * 1.2).toFixed(2)}` : `$${product.price.toFixed(2)}`}</p>
                ${product.onSale ? `<p class="text-sm text-accent font-bold">Oferta: $${product.price.toFixed(2)}</p>` : ''}
                <p class="text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}">${product.inStock ? 'En stock' : 'Agotado'}</p>
                <button class="mt-2 bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-accent transition duration-300 w-full ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Agregar al carrito' : 'Agotado'}
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
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-primary">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${product.description}</p>
                <p class="text-dark ${product.onSale ? 'line-through' : ''}">${product.onSale ? `$${(product.price * 1.2).toFixed(2)}` : `$${product.price.toFixed(2)}`}</p>
                ${product.onSale ? `<p class="text-accent font-bold">Oferta: $${product.price.toFixed(2)}</p>` : ''}
                <p class="text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}">${product.inStock ? 'En stock' : 'Agotado'}</p>
                <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-accent transition duration-300 w-full ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Agregar al carrito' : 'Agotado'}
                </button>
            </div>
        `;
        productGrid.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

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
    const customerInfoForm = document.getElementById('customer-info-form');

    if (!cartModal || !cartItems || !cartTotal || !customerInfoForm) return;

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

    // Mostrar el formulario de información del cliente
    customerInfoForm.style.display = 'block';
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

async function sendOrderInfo(event) {
    event.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const customerPhone = document.getElementById('customer-phone').value;

    if (!customerName || !customerEmail || !customerPhone) {
        alert('Por favor, complete todos los campos de información del cliente.');
        return;
    }

    const orderInfo = {
        customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone
        },
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0)
    };

    try {
        // Enviar datos a Formspree
        const response = await fetch('https://formspree.io/f/mvgorzwo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        });

        if (response.ok) {
            // Si el envío a Formspree es exitoso, crear la preferencia de MercadoPago
            const mercadoPagoResponse = await fetch('/.netlify/functions/create-preference', {
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

            if (mercadoPagoResponse.ok) {
                const preference = await mercadoPagoResponse.json();
                // Redirigir al usuario al Checkout Pro de MercadoPago
                window.location.href = preference.init_point;
            } else {
                throw new Error('Error al crear la preferencia de MercadoPago');
            }
        } else {
            throw new Error('Error al enviar el formulario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su pedido. Por favor, inténtelo de nuevo.');
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
    const submitOrderButton = document.getElementById('submit-order');

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

    if (submitOrderButton) {
        submitOrderButton.addEventListener('click', sendOrderInfo);
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