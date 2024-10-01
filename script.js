// Simulación de datos de productos
const products = [
    { id: 1, name: 'Producto 1', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'category1' },
    { id: 2, name: 'Producto 2', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'category2' },
    { id: 3, name: 'Producto 3', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'category3' },
    { id: 4, name: 'Producto 4', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'category1' },
    { id: 5, name: 'Producto 5', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'category2' },
    { id: 6, name: 'Producto 6', price: 44.99, image: 'https://via.placeholder.com/300x300', category: 'category3' },
    { id: 7, name: 'Producto 7', price: 54.99, image: 'https://via.placeholder.com/300x300', category: 'category1' },
    { id: 8, name: 'Producto 8', price: 64.99, image: 'https://via.placeholder.com/300x300', category: 'category2' },
];

const featuredProducts = products.slice(0, 4); // Tomamos los primeros 4 productos como destacados

let cart = [];

// Función para cargar productos en el slider
function loadProductSlider(category = 'all') {
    const productSlider = document.getElementById('product-slider');
    if (!productSlider) return;

    productSlider.innerHTML = '';

    products.forEach(product => {
        if (category === 'all' || product.category === category) {
            const productElement = document.createElement('div');
            productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                    <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                    <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300" onclick="addToCart(${product.id})">Agregar al carrito</button>
                </div>
            `;
            productSlider.appendChild(productElement);
        }
    });
}

// Función para cargar productos destacados
function loadFeaturedProducts() {
    const featuredSlider = document.getElementById('featured-slider');
    if (!featuredSlider) return;

    featuredSlider.innerHTML = '';

    featuredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300" onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        `;
        featuredSlider.appendChild(productElement);
    });
}

// Función para manejar el filtrado de productos
function handleProductFilters() {
    const filterButtons = document.querySelectorAll('#category-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadProductSlider(category);
            
            // Actualizar estilos de los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('bg-primary', 'text-white');
        });
    });
}

// Función para manejar el carrusel de productos
function handleProductSlider() {
    const slider = document.getElementById('product-slider');
    const prevButton = document.getElementById('prev-product');
    const nextButton = document.getElementById('next-product');

    if (!slider || !prevButton || !nextButton) return;

    prevButton.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// Función para manejar el carrusel de productos destacados
function handleFeaturedSlider() {
    const slider = document.getElementById('featured-slider');
    const prevButton = document.getElementById('prev-featured');
    const nextButton = document.getElementById('next-featured');

    if (!slider || !prevButton || !nextButton) return;

    prevButton.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// Función para manejar el carrusel
function handleCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentIndex = 0;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(currentIndex);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        });
    }

    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }, 5000);
}

// Función para manejar el menú móvil
function handleMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Función para manejar el desplazamiento suave
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para animar elementos al hacer scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Funciones para el carrito de compras
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

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Función para mostrar el carrito
function showCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartModal || !cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;
cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'flex justify-between items-center py-2 border-b';
        cartItem.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartModal.classList.remove('hidden');
}

// Función para cerrar el carrito
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.add('hidden');
    }
}

// Inicialización de funciones al cargar la página
function init() {
    loadProductSlider();
    loadFeaturedProducts();
    handleProductFilters();
    handleProductSlider();
    handleFeaturedSlider();
    handleCarousel();
    handleMobileMenu();
    handleSmoothScroll();
    handleScrollAnimations();
}

// Ejecutar la inicialización
document.addEventListener('DOMContentLoaded', init);