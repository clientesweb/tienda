// Data
const products = {
    velas: [
        { id: 1, name: "Vela Aromática Lavanda", price: 2500, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Vela aromática de lavanda para relajación." },
        { id: 2, name: "Vela de Soja Vainilla", price: 2800, image: "https://images.unsplash.com/photo-1602178856955-35a35ca588b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Vela de soja con aroma a vainilla." },
        { id: 3, name: "Set de Velas Decorativas", price: 3500, image: "https://images.unsplash.com/photo-1636103775596-3a519c4da522?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Set de velas decorativas para el hogar." },
    ],
    aromas: [
        { id: 4, name: "Difusor de Aromas Floral", price: 3200, image: "https://images.unsplash.com/photo-1602178231289-a1e8e7f4c320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Difusor de aromas con esencia floral." },
        { id: 5, name: "Aceite Esencial de Eucalipto", price: 1800, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Aceite esencial de eucalipto puro." },
        { id: 6, name: "Spray Ambiental Cítrico", price: 1500, image: "https://images.unsplash.com/photo-1616011462185-0b493ddf0515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Spray ambiental con aroma cítrico refrescante." },
    ],
    textiles: [
        { id: 7, name: "Manta de Algodón", price: 4500, image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Manta suave de algodón para sofá." },
        { id: 8, name: "Cojín Decorativo", price: 2200, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Cojín decorativo con diseño moderno." },
        { id: 9, name: "Cortinas de Lino", price: 6800, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Cortinas de lino elegantes para sala." },
    ],
    ceramica: [
        { id: 10, name: "Juego de Tazas", price: 3800, image: "https://images.unsplash.com/photo-1614702799409-de3c4343e65b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Juego de tazas de cerámica artesanal." },
        { id: 11, name: "Florero de Cerámica", price: 2900, image: "https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Florero de cerámica con diseño único." },
        { id: 12, name: "Plato Decorativo", price: 2500, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", description: "Plato decorativo de cerámica pintada a mano." },
    ],
};

const bannerMessages = [
    "¡Nueva colección de textiles disponible!",
    "Envíos gratis en compras superiores a $10000",
    "¡Ofertas especiales en velas aromáticas!"
];

const heroImages = [
    "img/hero1.jpg",
    "img/hero2.jpg",
    "img/hero3.jpg"
];

// State
let cart = [];
let currentBanner = 0;
let currentHeroImage = 0;
let currentStep = 1;

// DOM Elements
const bannerMessageEl = document.getElementById('bannerMessage');
const cartItemCountEl = document.getElementById('cartItemCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const heroEl = document.getElementById('hero');
const productContainers = {
    velas: document.getElementById('velasContainer'),
    aromas: document.getElementById('aromasContainer'),
    textiles: document.getElementById('textilesContainer'),
    ceramica: document.getElementById('ceramicaContainer'),
};

// Functions
function updateBanner() {
    bannerMessageEl.textContent = bannerMessages[currentBanner];
    currentBanner = (currentBanner + 1) % bannerMessages.length;
}

function updateHero() {
    heroEl.style.backgroundImage = `url('${heroImages[currentHeroImage]}')`;
    heroEl.style.backgroundSize = 'cover';
    heroEl.style.backgroundPosition = 'center';
    currentHeroImage = (currentHeroImage + 1) % heroImages.length;
}

function renderProducts() {
    for (const [category, productList] of Object.entries(products)) {
        productContainers[category].innerHTML = productList.map(product => `
            <div class="product-card flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-4">
                    <div class="relative mb-4 aspect-square">
                        <img src="${product.image}" alt="${product.name}" class="object-contain w-full h-full">
                    </div>
                    <h3 class="text-sm font-medium line-clamp-2">${product.name}</h3>
                    <p class="mt-2 text-lg font-bold">$${product.price.toLocaleString()}</p>
                    <button class="w-full mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors" onclick="openProductModal(${product.id}, '${category}')">
                        Ver detalles
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function scrollProducts(category, amount) {
    productContainers[category].scrollBy({ left: amount, behavior: 'smooth' });
}

function openProductModal(productId, category) {
    const product = products[category].find(p => p.id === productId);
    if (!product) return;

    const modalTitle = document.getElementById('productModalTitle');
    const modalContent = document.getElementById('productModalContent');

    modalTitle.textContent = product.name;
    modalContent.innerHTML = `
        <div class="grid gap-4 py-4">
            <div class="relative h-64 w-full">
                <img src="${product.image}" alt="${product.name}" class="object-contain w-full h-full">
            </div>
            <p class="text-gray-600">${product.description}</p>
            <p class="text-lg font-bold">$${product.price.toLocaleString()}</p>
            <div class="flex items-center justify-between">
                <label for="quantity" class="text-sm font-medium">Cantidad:</label>
                <div class="flex items-center">
                    <button class="bg-gray-200 px-2 py-1 rounded-l" onclick="updateQuantity(-1)">-</button>
                    <input id="quantity" type="number" class="w-16 text-center border-t border-b" value="1" min="1">
                    <button class="bg-gray-200 px-2 py-1 rounded-r" onclick="updateQuantity(1)">+</button>
                </div>
            </div>
            <button class="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors" onclick="addToCart(${product.id}, '${category}')">
                Agregar al carrito
            </button>
        </div>
    `;

    document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newQuantity = parseInt(quantityInput.value) + change;
    if (newQuantity < 1) newQuantity = 1;
    quantityInput.value = newQuantity;
}

function addToCart(productId, category) {
    const product = products[category].find(p => p.id === productId);
    if (!product) return;

    const quantity = parseInt(document.getElementById('quantity').value);
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCartUI();
    closeProductModal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartItemCountEl.textContent = totalItems;
    cartItemCountEl.classList.toggle('hidden', totalItems === 0);

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p class="text-sm text-gray-500">$${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
            </div>
            <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash h-4 w-4"></i>
            </button>
        </div>
    `).join('');

    cartTotalEl.textContent = totalPrice.toLocaleString();
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

function createWhatsAppMessage(formData) {
    let message = "🛒 *Nuevo Pedido - Mon Amour Textil*\n\n";
    message += "*Datos del Cliente:*\n";
    message += `- Nombre: ${formData.get('nombre')} ${formData.get('apellido')}\n`;
    message += `- Email: ${formData.get('email')}\n`;
    message += `- Teléfono: ${formData.get('telefono')}\n`;
    message += `- Método de envío: ${formData.get('shippingOption')}\n`;
    message += `- Método de pago: ${formData.get('paymentMethod')}\n\n`;
    
    message += "*Productos:*\n";
    cart.forEach(item => {
        message += `- ${item.name}\n`;
        message += `  Cantidad: ${item.quantity}\n`;
        message += `  Precio: ${formatPrice(item.price)}\n`;
        message += `  Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    
    message += `*Total: ${formatPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}*`;
    
    return encodeURIComponent(message);
}

function updateAdvertisingBanner() {
    const advertisingBanner = document.getElementById('advertisingBanner');
    const advertisingMessage = document.getElementById('advertisingMessage');
    const currentHour = new Date().getHours();
    let message, backgroundImage;

    if (currentHour >= 6 && currentHour < 12) {
        message = "¡Oferta matutina! 15% de descuento en todas las velas aromáticas";
        backgroundImage = "url('https://images.unsplash.com/photo-1602178231289-a1e8e7f4c320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')";
    } else if (currentHour >= 12 && currentHour < 18) {
        message = "¡Especial de la tarde! Compra un textil y lleva el segundo a mitad de precio";
        backgroundImage = "url('https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')";
    } else {
        message = "¡Oferta nocturna! Envío gratis en compras superiores a $8000";
        backgroundImage = "url('https://images.unsplash.com/photo-1616011462185-0b493ddf0515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')";
    }

    advertisingMessage.textContent = message;
    advertisingBanner.style.backgroundImage = backgroundImage;
}

function searchPostalCode() {
    const postalCode = document.querySelector('input[name="codigoPostal"]').value;
    const shippingOptions = document.getElementById('shippingOptions');
    
    // Simular una llamada a la API
    setTimeout(() => {
        const options = [
            { name: 'Envío Estándar', price: 500, time: '3-5 días hábiles' },
            { name: 'Envío Express', price: 1000, time: '1-2 días hábiles' }
        ];

        shippingOptions.innerHTML = `
            <h4 class="font-semibold mt-4 mb-2">Opciones de envío para ${postalCode}:</h4>
            ${options.map(option => `
                <div class="flex justify-between items-center border-b py-2">
                    <label class="flex items-center">
                        <input type="radio" name="shippingOption" value="${option.name}" class="mr-2">
                        ${option.name}
                    </label>
                    <span>$${option.price} - ${option.time}</span>
                </div>
            `).join('')}
        `;
        shippingOptions.classList.remove('hidden');
    }, 1000);
}

function updateCheckoutStep(step) {
    currentStep = step;
    document.querySelectorAll('.step').forEach((el, index) => {
        if (index + 1 <= step) {
            el.classList.remove('bg-gray-300', 'text-gray-600');
            el.classList.add('bg-primary', 'text-white');
        } else {
            el.classList.remove('bg-primary', 'text-white');
            el.classList.add('bg-gray-300', 'text-gray-600');
        }
    });
    document.querySelectorAll('.step-content').forEach((el, index) => {
        if (index + 1 === step) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

// MercadoPago integration
function initMercadoPago() {
  const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db');
  const bricksBuilder = mp.bricks();

  const renderCheckoutButton = async (bricksBuilder) => {
    const settings = {
      initialization: {
        preferenceId: await createPreference(),
      },
      callbacks: {
        onReady: () => {
          console.log('Brick ready');
        },
        onSubmit: (cardFormData) => {
          // Aquí no necesitamos hacer nada, MercadoPago manejará el envío
          console.log('Payment submission started');
        },
        onError: (error) => {
          console.error('Brick error', error);
          alert('Hubo un error al procesar el pago. Por favor, intenta de nuevo.');
        },
      },
    };
    
    const container = document.getElementById('wallet_container');
    container.innerHTML = '';
    
    try {
      window.checkoutBrickController = await bricksBuilder.create('wallet', 'wallet_container', settings);
    } catch (error) {
      console.error('Error al crear el botón de MercadoPago:', error);
      alert('No se pudo iniciar el proceso de pago. Por favor, intenta de nuevo más tarde.');
    }
  };

  renderCheckoutButton(bricksBuilder);
}

async function createPreference() {
  const items = cart.map(item => ({
    title: item.name,
    unit_price: item.price,
    quantity: item.quantity,
  }));

  const payer = {
    name: document.querySelector('input[name="nombre"]').value,
    surname: document.querySelector('input[name="apellido"]').value,
    email: document.querySelector('input[name="email"]').value,
    phone: {
      number: document.querySelector('input[name="telefono"]').value
    },
    address: {
      street_name: document.querySelector('input[name="calle"]').value,
      street_number: document.querySelector('input[name="numero"]').value,
      zip_code: document.querySelector('input[name="codigoPostal"]').value
    }
  };

  try {
    const response = await fetch('/.netlify/functions/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, payer }),
    });

    if (!response.ok) {
      throw new Error('Failed to create preference');
    }

    const data = await response.json();
    if (!data.id) {
      throw new Error('Invalid preference ID received');
    }
    return data.id;
  } catch (error) {
    console.error('Error creating preference:', error);
    alert('Hubo un error al preparar el pago. Por favor, intenta de nuevo.');
    throw error;
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('closeBanner').addEventListener('click', () => {
        document.getElementById('topBanner').classList.add('hidden');
    });

    document.getElementById('mobileMenuButton').addEventListener('click', () => {
        const menuIcon = document.querySelector('.menu-icon');
        menuIcon.classList.toggle('open');
        document.getElementById('mobileMenu').classList.toggle('hidden');
    });

    document.getElementById('closeMobileMenu').addEventListener('click', () => {
        const menuIcon = document.querySelector('.menu-icon');
        menuIcon.classList.remove('open');
        document.getElementById('mobileMenu').classList.add('hidden');
    });

    document.getElementById('cartButton').addEventListener('click', () => {
        document.getElementById('cartModal').classList.remove('hidden');
    });

    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartModal').classList.add('hidden');
    });

    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);

    document.getElementById('whatsappButton').addEventListener('click', () => {
        window.open('https://wa.me/5493534786106', '_blank');
    });

    document.getElementById('closeWhatsappNotification').addEventListener('click', () => {
        document.getElementById('whatsappNotification').classList.add('hidden');
    });

    document.getElementById('checkoutForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Si estamos en el paso de pago y MercadoPago está activo, no procesamos el formulario
        if (currentStep === 2 && document.getElementById('wallet_container').children.length > 0) {
          console.log('MercadoPago payment in progress');
          return;
        }

        const formData = new FormData(this);

        // Agregar información del carrito a formData
        cart.forEach((item, index) => {
            formData.append(`item_${index}_name`, item.name);
            formData.append(`item_${index}_quantity`, item.quantity);
            formData.append(`item_${index}_price`, item.price);
        });
        formData.append('total', cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

        try {
            const response = await fetch("https://formspree.io/f/xrbglzrk", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('¡Gracias por tu compra! Te contactaremos pronto.');
                document.getElementById('checkoutModal').classList.add('hidden');
                document.getElementById('cartModal').classList.add('hidden');
                cart = [];
                updateCartUI();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! Hubo un problema al enviar el formulario");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Oops! Hubo un problema al enviar el formulario");
        }
    });

    document.getElementById('checkoutButton').addEventListener('click', function() {
        document.getElementById('cartModal').classList.add('hidden');
        document.getElementById('checkoutModal').classList.remove('hidden');
        updateCheckoutStep(1);
    });

    document.getElementById('closeCheckoutModal').addEventListener('click', function() {
        document.getElementById('checkoutModal').classList.add('hidden');
    });

    document.getElementById('searchPostalCode').addEventListener('click', searchPostalCode);

    document.getElementById('nextToPayment').addEventListener('click', function() {
      if (validateForm()) {
        updateCheckoutStep(2);
        initMercadoPago();
      } else {
        alert('Por favor, completa todos los campos requeridos antes de continuar.');
      }
    });

    document.getElementById('showTransferModal').addEventListener('click', function() {
        document.getElementById('transferModal').classList.remove('hidden');
    });

    document.getElementById('closeTransferModal').addEventListener('click', function() {
        document.getElementById('transferModal').classList.add('hidden');
    });

    document.getElementById('submitTransfer').addEventListener('click', function() {
        // Aquí iría la lógica para procesar la transferencia
        console.log('Procesando transferencia');
        document.getElementById('transferModal').classList.add('hidden');
        updateCheckoutStep(3);
    });

    document.getElementById('closeCheckout').addEventListener('click', function() {
        document.getElementById('checkoutModal').classList.add('hidden');
        cart = [];
        updateCartUI();
    });

    updateBanner();
    setInterval(updateBanner, 5000);

    updateHero();
    setInterval(updateHero, 5000);

    renderProducts();

    updateAdvertisingBanner();
    setInterval(updateAdvertisingBanner, 3600000); // Update every hour

    setTimeout(() => {
        document.getElementById('whatsappNotification').classList.remove('hidden');
    }, 10000);

    // Remove preloader
    document.getElementById('preloader').style.display = 'none';
});

function validateForm() {
  const requiredFields = [
    'nombre', 'apellido', 'email', 'telefono', 'calle', 'numero', 'codigoPostal', 'ciudad', 'provincia'
  ];
  return requiredFields.every(field => document.querySelector(`input[name="${field}"]`).value.trim() !== '');
}

console.log("Script loaded successfully!");