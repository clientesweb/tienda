// Simulación de datos de productos
const products = [
    { id: 1, name: 'Producto 1', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'category1' },
    { id: 2, name: 'Producto 2', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'category2' },
    { id: 3, name: 'Producto 3', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'category3' },
    { id: 4, name: 'Producto 4', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'category1' },
    { id: 5, name: 'Producto 5', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'category2' },
    { id: 6, name: 'Producto 6', price: 44.99, image: 'https://via.placeholder.com/300x300', category: 'category3' },
];

let cart = [];

// Función para cargar productos
function loadProducts(category = 'all') {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        if (category === 'all' || product.category === category) {
            const productElement = document.createElement('div');
            productElement.className = 'bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                    <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                    <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300" onclick="addToCart(${product.id})">Agregar al carrito</button>
                </div>
            `;
            productGrid.appendChild(productElement);
        }
    });
}

// Función para manejar el filtrado de productos
function handleProductFilters() {
    const filterButtons = document.querySelectorAll('#category-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadProducts(category);
            
            // Actualizar estilos de los botones
            filterButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('bg-blue-500', 'text-white');
        });
    });
}

// Función para manejar el carrusel
function handleCarousel() {
    const carousel = document.getElementById('hero-carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentIndex = 0;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    });

    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }, 5000);
}

// Función para manejar el menú móvil
function handleMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
        nav.classList.toggle('flex-col');
        nav.classList.toggle('absolute');
        nav.classList.toggle('top-16');
        nav.classList.toggle('left-0');
        nav.classList.toggle('right-0');
        nav.classList.toggle('bg-white');
        nav.classList.toggle('shadow-md');
    });
}

// Función para manejar el desplazamiento suave
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

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
    cartModal.classList.remove('flex');
    cartModal.classList.add('hidden');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    handleProductFilters();
    handleCarousel();
    handleMobileMenu();
    handleSmoothScroll();
    handleScrollAnimations();

    // Event listeners para el carrito
    document.getElementById('cart-button').addEventListener('click', showCart);
    document.getElementById('close-cart').addEventListener('click', hideCart);
    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        cart = [];
        updateCartCount();
        hideCart();
    });
});