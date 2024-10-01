document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Swiper para el anuncio superior
    const announcementSwiper = new Swiper('.announcement-swiper', {
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Inicializar Swiper para el hero
    const heroSwiper = new Swiper('#hero .swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });

    // Inicializar Swiper para los testimonios
    const testimonialsSwiper = new Swiper('.testimonials-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Cargar productos destacados
    const featuredProducts = [
        { id: 1, name: 'Anillo de Diamantes', price: 999, image: 'https://shopthejewels.in/cdn/shop/files/Untitled_design_-_2023-07-01T130745.006_1950x.png?v=1688198280' },
        { id: 2, name: 'Collar de Oro', price: 799, image: 'https://shopthejewels.in/cdn/shop/files/Untitled_design_-_2023-07-01T130745.006_1950x.png?v=1688198280' },
        { id: 3, name: 'Pendientes de Perlas', price: 299, image: 'https://shopthejewels.in/cdn/shop/files/Untitled_design_-_2023-07-01T130745.006_1950x.png?v=1688198280' },
        { id: 4, name: 'Pulsera de Plata', price: 199, image: 'https://shopthejewels.in/cdn/shop/files/Untitled_design_-_2023-07-01T130745.006_1950x.png?v=1688198280' },
    ];

    const featuredProductsGrid = document.getElementById('featured-products-grid');
    featuredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'bg-white rounded-lg shadow-md overflow-hidden product-item';
        productElement.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover product-image">
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300">
                    <button class="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 quick-view" data-id="${product.id}">
                        Vista Rápida
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600">$${product.price}</p>
                <button class="mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300 add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    Añadir al Carrito
                </button>
            </div>
        `;
        featuredProductsGrid.appendChild(productElement);
    });

    // Funcionalidad del carrito
    let cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            
            updateCart();
            button.classList.add('add-to-cart-animation');
            setTimeout(() => button.classList.remove('add-to-cart-animation'), 300);
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        let count = 0;
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center mb-2';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
            count += item.quantity;
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = count;
        cartCount.classList.add('add-to-cart-animation');
        setTimeout(() => cartCount.classList.remove('add-to-cart-animation'), 300);
    }

    // Manejo de modales
    const searchModal = document.getElementById('search-modal');
    const cartModal = document.getElementById('cart-modal');
    const loginModal = document.getElementById('login-modal');
    const paymentModal = document.getElementById('payment-modal');

    document.getElementById('search-btn').addEventListener('click', () => {
        searchModal.style.display = 'flex';
        setTimeout(() => searchModal.classList.add('show'), 10);
    });

    document.getElementById('cart-btn').addEventListener('click', () => {
        cartModal.style.display = 'flex';
        setTimeout(() => cartModal.classList.add('show'), 10);
    });

    document.getElementById('user-btn').addEventListener('click', () => {
        loginModal.style.display = 'flex';
        setTimeout(() => loginModal.classList.add('show'), 10);
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        cartModal.style.display = 'none';
        paymentModal.style.display = 'flex';
        setTimeout(() => paymentModal.classList.add('show'), 10);
    });

    document.getElementById('close-search').addEventListener('click', () => {
        searchModal.classList.remove('show');
        setTimeout(() => searchModal.style.display = 'none', 300);
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        cartModal.classList.remove('show');
        setTimeout(() => cartModal.style.display = 'none', 300);
    });

    document.getElementById('close-login').addEventListener('click', () => {
        loginModal.classList.remove('show');
        setTimeout(() => loginModal.style.display = 'none', 300);
    });

    document.getElementById('close-payment').addEventListener('click', () => {
        paymentModal.classList.remove('show');
        setTimeout(() => paymentModal.style.display = 'none', 300);
    });

    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('show');
            setTimeout(() => searchModal.style.display = 'none', 300);
        }
        if (e.target === cartModal) {
            cartModal.classList.remove('show');
            setTimeout(() => cartModal.style.display = 'none', 300);
        }
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
            setTimeout(() => loginModal.style.display = 'none', 300);
        }
        if (e.target === paymentModal) {
            paymentModal.classList.remove('show');
            setTimeout(() => paymentModal.style.display = 'none', 300);
        }
    });

    // Manejo del formulario de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Gracias por suscribirte con el email: ${email}`);
        newsletterForm.reset();
    });

    // Manejo del formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        alert(`Inicio de sesión con email: ${email} y contraseña: ${password}`);
        loginForm.reset();
        loginModal.classList.remove('show');
        setTimeout(() => loginModal.style.display = 'none', 300);
    });

    // Manejo del formulario de pago
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        alert(`Pago procesado con éxito. Número de tarjeta: ${cardNumber}, Fecha de expiración: ${expiryDate}, CVV: ${cvv}`);
        paymentForm.reset();
        cart = [];
        updateCart();
        paymentModal.classList.remove('show');
        setTimeout(() => paymentModal.style.display = 'none', 300);
    });

    // Manejo del menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Header sticky
    const header = document.getElementById('main-header');
    const headerOffset = header.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > headerOffset) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Vista rápida de productos
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-id');
            const product = featuredProducts.find(p => p.id === parseInt(productId));
            if (product) {
                const quickViewModal = document.createElement('div');
                quickViewModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
                quickViewModal.innerHTML = `
                    <div class="bg-white p-8 rounded-lg w-full max-w-2xl">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-2xl font-bold">${product.name}</h2>
                            <button class="text-2xl close-quick-view">&times;</button>
                        </div>
                        <div class="flex flex-col md:flex-row">
                            <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0 md:mr-4">
                            <div>
                                <p class="text-xl font-bold mb-2">$${product.price}</p>
                                <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <button class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300 add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                                    Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(quickViewModal);
                quickViewModal.querySelector('.close-quick-view').addEventListener('click', () => {
                    document.body.removeChild(quickViewModal);
                });
                quickViewModal.querySelector('.add-to-cart').addEventListener('click', (e) => {
                    const button = e.target;
                    const id = button.getAttribute('data-id');
                    const name = button.getAttribute('data-name');
                    const price = parseFloat(button.getAttribute('data-price'));
                    
                    const existingItem = cart.find(item => item.id === id);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({ id, name, price, quantity: 1 });
                    }
                    
                    updateCart();
                    button.classList.add('add-to-cart-animation');
                    setTimeout(() => button.classList.remove('add-to-cart-animation'), 300);
                });
            }
        });
    });
});