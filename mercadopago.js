// mercadopago.js

// Inicializar el objeto de Mercado Pago
const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db', {
    locale: 'es-AR'
});

let checkoutButtonCreated = false;

// Función para crear el botón de pago
function createCheckoutButton(preferenceId) {
    // Limpiar el contenedor del botón si ya existe
    const mpButtonContainer = document.getElementById('mercadopago-button');
    mpButtonContainer.innerHTML = '';

    const bricksBuilder = mp.bricks();

    bricksBuilder.create("wallet", "mercadopago-button", {
        initialization: {
            preferenceId: preferenceId
        },
        callbacks: {
            onError: (error) => {
                console.error('Error en el pago:', error);
                showErrorMessage('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
            },
            onReady: () => {
                console.log('Botón de pago listo');
                checkoutButtonCreated = true;
                hideLoadingIndicator();
            },
            onSubmit: () => {
                showLoadingIndicator('Procesando pago...');
            },
            onPaymentSuccess: (data) => {
                console.log('Pago exitoso:', data);
                showSuccessMessage('¡Pago realizado con éxito! Gracias por tu compra.');
                clearCart();
            }
        }
    });
}

// Función para crear la preferencia de pago
function createPreference() {
    const items = cart.map(item => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
    }));

    const shippingMethod = document.getElementById('shippingMethod');
    const selectedShipping = shippingMethod.options[shippingMethod.selectedIndex];
    const shippingCost = parseInt(selectedShipping.dataset.cost);

    const orderData = prepareOrderData();

    return fetch('/.netlify/functions/create-preference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: items,
            shipments: {
                cost: shippingCost,
                mode: "not_specified",
            },
            payer: {
                name: orderData.customerInfo.nombre,
                surname: orderData.customerInfo.apellido,
                email: orderData.customerInfo.email,
                phone: {
                    area_code: "",
                    number: orderData.customerInfo.telefono
                },
                address: {
                    street_name: orderData.customerInfo.calle,
                    street_number: orderData.customerInfo.numero,
                    zip_code: orderData.customerInfo.codigoPostal
                }
            }
        })
    })
    .then(response => response.json())
    .then(data => data.id);
}

// Función para mostrar el indicador de carga
function showLoadingIndicator(message = 'Cargando...') {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.textContent = message;
    loadingIndicator.classList.remove('hidden');
}

// Función para ocultar el indicador de carga
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.add('hidden');
}

// Función para mostrar mensajes de error
function showErrorMessage(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Función para mostrar mensajes de éxito
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}

// Función para limpiar el carrito después de un pago exitoso
function clearCart() {
    cart = [];
    updateCartUI();
    document.getElementById('checkoutModal').classList.add('hidden');
}

// Función para iniciar el proceso de pago con Mercado Pago
function initMercadoPago(orderData) {
    showLoadingIndicator('Preparando el pago...');
    
    // Primero, enviar los datos del pedido a Formspree
    sendOrderToFormspree(orderData)
        .then(() => {
            // Luego, crear la preferencia de pago de Mercado Pago
            return createPreference();
        })
        .then(preferenceId => {
            createCheckoutButton(preferenceId);
        })
        .catch(error => {
            console.error('Error al iniciar el proceso de pago:', error);
            showErrorMessage('Hubo un error al iniciar el proceso de pago. Por favor, inténtalo de nuevo.');
            hideLoadingIndicator();
        });
}

// Evento para iniciar el proceso de pago
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orderData = prepareOrderData();
    initMercadoPago(orderData);
});

// Asegúrate de que estas funciones estén definidas o importadas correctamente
// prepareOrderData, updateCartUI, sendOrderToFormspree