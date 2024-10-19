// Simulación de datos de productos
let products = [
    // Velas
    { id: 1, name: 'Vela Aromática Lavanda', price: 19.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 10, description: 'Vela aromática de lavanda para relajación y aromaterapia.' },
    { id: 2, name: 'Vela de Soja Natural', price: 24.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 15, description: 'Vela ecológica hecha de soja 100% natural.' },
    { id: 3, name: 'Set de Velas Decorativas', price: 34.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 8, description: 'Set de 3 velas decorativas para crear ambiente.' },
    { id: 4, name: 'Vela en Tarro de Cristal', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: false, stock: 12, description: 'Elegante vela en tarro de cristal reutilizable.' },
    { id: 5, name: 'Vela Perfumada de Vainilla', price: 22.99, image: 'https://via.placeholder.com/300x300', category: 'velas', featured: true, stock: 20, description: 'Vela con aroma a vainilla para un ambiente acogedor.' },
    
    // Cerámica
    { id: 6, name: 'Tazón de Cerámica Artesanal', price: 39.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 7, description: 'Tazón hecho a mano con diseño único.' },
    { id: 7, name: 'Plato Decorativo de Cerámica', price: 44.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 5, description: 'Plato decorativo con motivos florales pintados a mano.' },
    { id: 8, name: 'Jarrón de Cerámica Pintado', price: 59.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: false, stock: 3, description: 'Jarrón de cerámica con diseño abstracto pintado a mano.' },
    { id: 9, name: 'Set de Tazas de Café', price: 49.99, image: 'https://via.placeholder.com/300x300', category: 'ceramica', featured: true, stock: 10, description: 'Set de 4 tazas de café de cerámica con diseños variados.' },
    
    // Textiles
    { id: 10, name: 'Cojín Decorativo de Algodón', price: 29.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 15, description: 'Cojín decorativo de algodón orgánico con diseño geométrico.' },
    { id: 11, name: 'Manta Tejida a Mano', price: 79.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 6, description: 'Manta suave y cálida tejida a mano con lana de alpaca.' },
    { id: 12, name: 'Cortinas de Lino Natural', price: 89.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: false, stock: 4, description: 'Par de cortinas de lino natural con acabado rústico.' },
    { id: 13, name: 'Tapete de Yute Redondo', price: 69.99, image: 'https://via.placeholder.com/300x300', category: 'textiles', featured: true, stock: 8, description: 'Tapete redondo de yute trenzado, perfecto para decoración boho.' },
];

let cart = [];
let currentPage = 1;
const productsPerPage = 6;

function loadProducts(category = 'all', page = 1) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const filteredProducts = products.filter(product => category === 'all' || product.category === category);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    paginatedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        
        const discount = Math.random() < 0.3 ? Math.floor(Math.random() * 30) + 10 : 0; // 30% de probabilidad de descuento entre 10% y 40%
        const discountedPrice = product.price * (1 - discount / 100);
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-primary">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${product.description}</p>
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

    updatePaginationButtons(filteredProducts.length, page);
}

function updatePaginationButtons(totalProducts, currentPage) {
    const prevButton = document.getElementById('prev-products');
    const nextButton = document.getElementById('next-products');

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    prevButton.classList.toggle('opacity-50', currentPage === 1);
    nextButton.classList.toggle('opacity-50', currentPage === totalPages);
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    featuredContainer.innerHTML = '';

    const featuredProducts = products.filter(product => product.featured);
    featuredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
        
        const discount = Math.random()  < 0.3 ? Math.floor(Math.random() * 30) + 10 : 0;
        const discountedPrice = product.price * (1 - discount / 100);
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="text-md font-semibold mb-2 text-primary">${product.name}</h4>
                <p class="text-sm text-gray-600 mb-2">${product.description}</p>
                <p class="text-sm text-dark ${discount > 0 ? 'line-through' : ''}">${product.price.toFixed(2)}€</p>
                ${discount > 0 ? `<p class="text-sm text-accent font-bold">${discountedPrice.toFixed(2)}€ (-${discount}%)</p>` : ''}
                <p class="text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}">${product.stock > 0 ? 'En stock'  : 'Agotado'}</p>
                <button class="mt-2 bg-primary text-white px-3 py-1 rounded-full hover:bg-accent transition duration-300 w-full text-sm ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                        onclick="addToCart(${product.id})" 
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                </button>
            </div>
        `;
        featuredContainer.appendChild(productElement);
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
        updateCartModal();
        showNotification(`${product.name} agregado al carrito`);
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const product = products.find(p => p.id === productId);
        if (product) {
            product.stock += cart[index].quantity;
        }
        cart.splice(index, 1);
        updateCartCount();
        updateCartModal();
        showNotification(`Producto eliminado del carrito`);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-2';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}€</span>
            <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `${total.toFixed(2)}€`;

    // Actualizar el botón de MercadoPago
    updateMercadoPagoButton(total);
}

function updateMercadoPagoButton(total) {
    const mpButtonContainer = document.getElementById('mercadopago-button-container');
    mpButtonContainer.innerHTML = ''; // Limpiar el contenedor

    if (total > 0) {
        const mp = new MercadoPago(MERCADOPAGO_PUBLIC_KEY);
        const checkout = mp.checkout({
            preference: {
                items: cart.map(item => ({
                    title: item.name,
                    quantity: item.quantity,
                    currency_id: 'ARS',
                    unit_price: item.price
                }))
            },
            render: {
                container: '#mercadopago-button-container',
                label: 'Pagar con MercadoPago'
            }
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function loadAdminPanel() {
    const adminProducts = document.getElementById('admin-products');
    adminProducts.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'mb-4 p-4 border rounded';
        productElement.innerHTML = `
            <h3 class="font-bold">${product.name}</h3>
            <p>Precio: <input type="number" value="${product.price}" onchange="updateProductPrice(${product.id}, this.value)" class="border rounded px-2 py-1 w-24"></p>
            <p>Stock: <input type="number" value="${product.stock}" onchange="updateProductStock(${product.id}, this.value)" class="border rounded px-2 py-1 w-24"></p>
            <p>Descuento: <input type="number" value="0" onchange="updateProductDiscount(${product.id}, this.value)" class="border rounded px-2 py-1 w-24"> %</p>
        `;
        adminProducts.appendChild(productElement);
    });
}

function updateProductPrice(id, newPrice) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.price = parseFloat(newPrice);
        loadProducts();
        loadFeaturedProducts();
    }
}

function updateProductStock(id, newStock) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.stock = parseInt(newStock);
        loadProducts();
        loadFeaturedProducts();
    }
}

function updateProductDiscount(id, discount) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.discount = parseInt(discount);
        loadProducts();
        loadFeaturedProducts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadFeaturedProducts();

    const categoryFilters = document.getElementById('category-filters');
    if (categoryFilters) {
        categoryFilters.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const category = e.target.getAttribute('data-category');
                currentPage = 1;
                loadProducts(category, currentPage);
            }
        });
    }

    const prevButton = document.getElementById('prev-products');
    const nextButton = document.getElementById('next-products');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadProducts('all', currentPage);
            }
        });

        nextButton.addEventListener('click', () => {
            const totalProducts = products.length;
            const totalPages = Math.ceil(totalProducts / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                loadProducts('all', currentPage);
            }
        });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
            currentPage = 1;
            loadProducts('all', currentPage, filteredProducts);
        });
    }

    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');

    if (cartButton && cartModal && closeCartButton) {
        cartButton.addEventListener('click', () => {
            cartModal.classList.remove('hidden');
            updateCartModal();
        });

        closeCartButton.addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.add('hidden');
            }
        });
    }

    // Carrusel de imágenes del hero
    const heroSection = document.getElementById('hero');
    const heroImages = [
        'https://via.placeholder.com/1200x600?text=Imagen+Hero+1',
        'https://via.placeholder.com/1200x600?text=Imagen+Hero+2',
        'https://via.placeholder.com/1200x600?text=Imagen+Hero+3'
    ];
    let currentHeroImage = 0;

    function changeHeroImage() {
        heroSection.style.backgroundImage = `url('${heroImages[currentHeroImage]}')`;
        currentHeroImage = (currentHeroImage + 1) % heroImages.length;
    }

    changeHeroImage(); // Establecer la primera imagen
    setInterval(changeHeroImage, 5000); // Cambiar la imagen cada 5 segundos

    // Carrusel de anuncios
    const adCarousel = document.getElementById('ad-carousel');
    const adImages = [
        'https://via.placeholder.com/800x400?text=Anuncio+1',
        'https://via.placeholder.com/800x400?text=Anuncio+2',
        'https://via.placeholder.com/800x400?text=Anuncio+3'
    ];
    let currentAdImage = 0;

    function changeAdImage() {
        adCarousel.style.backgroundImage = `url('${adImages[currentAdImage]}')`;
        currentAdImage = (currentAdImage + 1) % adImages.length;
    }

    changeAdImage(); // Establecer el primer anuncio
    setInterval(changeAdImage, 7000); // Cambiar el anuncio cada 7 segundos

    // Banner superior rotativo
    const topBannerSlides = document.querySelectorAll('.top-banner-slide');
    let currentBannerSlide = 0;

    function rotateBanner() {
        topBannerSlides[currentBannerSlide].classList.remove('active');
        currentBannerSlide = (currentBannerSlide + 1) % topBannerSlides.length;
        topBannerSlides[currentBannerSlide].classList.add('active');
    }

    setInterval(rotateBanner, 5000); // Rotar el banner cada 5 segundos

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

    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Panel de administración
    const adminButton = document.getElementById('admin-button');
    const adminPanel = document.getElementById('admin-panel');
    const closeAdminButton = document.getElementById('close-admin');

    if (adminButton && adminPanel && closeAdminButton) {
        adminButton.addEventListener('click', () => {
            adminPanel.classList.remove('hidden');
            loadAdminPanel();
        });

        closeAdminButton.addEventListener('click', () => {
            adminPanel.classList.add('hidden');
        });

        adminPanel.addEventListener('click', (e) => {
            if (e.target === adminPanel) {
                adminPanel.classList.add('hidden');
            }
        });
    }
});