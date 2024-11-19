// mercadopago.js

// Inicializar el objeto de Mercado Pago
const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db', {
    locale: 'es-AR'
});

let checkoutButtonCreated = false;

// Función para crear el botón de pago
function createCheckoutButton(preferenceId) {
    if (checkoutButtonCreated) {
        document.getElementById('mercadopago-button').innerHTML = '';
    }

    const bricksBuilder = mp.bricks();

    bricksBuilder.create("wallet", "mercadopago-button", {
        initialization: {
            preferenceId: preferenceId
        },
        callbacks: {
            onError: (error) => {
                console.error('Error en el pago:', error);
                alert('Hubo un error al procesar el pago. Por favor, intenta de nuevo.');
            },
            onReady: () => {
                console.log('Botón de pago listo');
                checkoutButtonCreated = true;
                document.getElementById('mercadopago-button').style.display = 'block';
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

    const shippingMethod = document.getElementById('shippingMethodContainer').querySelector('input[name="shippingMethod"]:checked');
    const shippingCost = parseInt(shippingMethod.dataset.cost);

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
            }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la preferencia de pago');
        }
        return response.json();
    })
    .then(data => data.id);
}

// Función para mostrar y ocultar el indicador de carga
function toggleLoadingIndicator(show) {
    const button = document.querySelector('#checkoutForm button[type="submit"]');
    if (show) {
        button.disabled = true;
        button.innerHTML = 'Procesando...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Finalizar compra';
    }
}

// Función para iniciar el proceso de pago con Mercado Pago
function initiateMercadoPagoPayment() {
    toggleLoadingIndicator(true);
    createPreference()
        .then(preferenceId => {
            createCheckoutButton(preferenceId);
            toggleLoadingIndicator(false);
        })
        .catch(error => {
            console.error('Error al crear la preferencia:', error);
            toggleLoadingIndicator(false);
            alert('Hubo un problema al iniciar el proceso de pago. Por favor, intenta de nuevo.');
        });
}

// Escuchar cambios en el método de pago
document.getElementById('paymentMethod').addEventListener('change', function(e) {
    const mercadoPagoButton = document.getElementById('mercadopago-button');
    if (e.target.value === 'mercadopago') {
        mercadoPagoButton.style.display = 'block';
        initiateMercadoPagoPayment();
    } else {
        mercadoPagoButton.style.display = 'none';
    }
});

// Manejar el envío del formulario
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (paymentMethod === 'mercadopago') {
        e.preventDefault(); // Prevenir el envío del formulario si se selecciona MercadoPago
    }
    // Para otros métodos de pago, el formulario se enviará normalmente
});