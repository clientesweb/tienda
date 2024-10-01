document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
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
        productElement.className = 'bg-white rounded-lg shadow-md overflow-hidden';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600">$${product.price}</p>
                <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
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
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Manejo de modales
    const searchModal = document.getElementById('search-modal');
    const cartModal = document.getElementById('cart-modal');
    const loginModal = document.getElementById('login-modal');

    document.getElementById('search-btn').addEventListener('click', () => {
        searchModal.style.display = 'flex';
    });

    document.getElementById('cart-btn').addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    document.getElementById('user-btn').addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    document.getElementById('close-search').addEventListener('click', () => {
        searchModal.style.display = 'none';
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    document.getElementById('close-login').addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) searchModal.style.display = 'none';
        if (e.target === cartModal) cartModal.style.display = 'none';
        if (e.target === loginModal) loginModal.style.display = 'none';
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
        loginModal.style.display = 'none';
    });
});