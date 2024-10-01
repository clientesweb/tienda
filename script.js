// Simulación de datos de productos
const products = [
    { id: 1, name: 'Producto 1', price: 19.99, category: 'category1' },
    { id: 2, name: 'Producto 2', price: 29.99, category: 'category2' },
    { id: 3, name: 'Producto 3', price: 39.99, category: 'category3' },
    { id: 4, name: 'Producto 4', price: 24.99, category: 'category1' },
    { id: 5, name: 'Producto 5', price: 34.99, category: 'category2' },
    { id: 6, name: 'Producto 6', price: 44.99, category: 'category3' },
    { id: 7, name: 'Producto 7', price: 54.99, category: 'category1' },
    { id: 8, name: 'Producto 8', price: 64.99, category: 'category2' },
].map(product => ({
    ...product,
    image: `/api/placeholder/300/300` // Usando placeholder local en lugar de URL externa
}));

const featuredProducts = products.slice(0, 4);
let cart = [];

// Función para cargar productos en el slider
function loadProductSlider(category = 'all') {
    const productSlider = document.getElementById('product-slider');
    if (!productSlider) {
        console.warn('Elemento product-slider no encontrado');
        return;
    }

    productSlider.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300" 
                    onclick="addToCart(${product.id})">
                    Agregar al carrito
                </button>
            </div>
        `;
        productSlider.appendChild(productElement);
    });
}

// Función para cargar productos destacados
function loadFeaturedProducts() {
    const featuredSlider = document.getElementById('featured-slider');
    if (!featuredSlider) {
        console.warn('Elemento featured-slider no encontrado');
        return;
    }

    featuredSlider.innerHTML = '';
    featuredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <button class="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300" 
                    onclick="addToCart(${product.id})">
                    Agregar al carrito
                </button>
            </div>
        `;
        featuredSlider.appendChild(productElement);
    });
}

// Funciones del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Producto con ID ${productId} no encontrado`);
        return;
    }

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
    if (!cartCount) {
        console.warn('Elemento cart-count no encontrado');
        return;
    }

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems.toString();
}

// Event listeners y inicialización
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadProductSlider();
        loadFeaturedProducts();
        initializeEventListeners();
    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }
});

function initializeEventListeners() {
    // Filtros de categoría
    const filterButtons = document.querySelectorAll('#category-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            loadProductSlider(category);
            updateFilterButtons(button, filterButtons);
        });
    });

    // Sliders
    initializeSlider('product-slider', 'prev-product', 'next-product');
    initializeSlider('featured-slider', 'prev-featured', 'next-featured');

    // Carrito
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
    
    if (cartButton) cartButton.addEventListener('click', showCart);
    if (closeCartButton) closeCartButton.addEventListener('click', hideCart);
}

function initializeSlider(sliderId, prevId, nextId) {
    const slider = document.getElementById(sliderId);
    const prevButton = document.getElementById(prevId);
    const nextButton = document.getElementById(nextId);

    if (!slider || !prevButton || !nextButton) {
        console.warn(`Elementos del slider ${sliderId} no encontrados`);
        return;
    }

    prevButton.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

function updateFilterButtons(activeButton, allButtons) {
    allButtons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    activeButton.classList.remove('bg-gray-200', 'text-gray-700');
    activeButton.classList.add('bg-primary', 'text-white');
}

// Funciones del carrito modal
function showCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) {
        console.warn('Elemento cart-modal no encontrado');
        return;
    }

    updateCartDisplay();
    cartModal.classList.remove('hidden');
    cartModal.classList.add('flex');
}

function hideCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;

    cartModal.classList.remove('flex');
    cartModal.classList.add('hidden');
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) {
        console.warn('Elementos del carrito no encontrados');
        return;
    }

    cartItems.innerHTML = '';
    const total = cart.reduce((sum, item) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-2';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
        return sum + (item.price * item.quantity);
    }, 0);

    cartTotal.textContent = `$${total.toFixed(2)}`;
}