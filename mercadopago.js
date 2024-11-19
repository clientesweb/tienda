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

    const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked');
    const shippingCost = shippingMethod ? parseInt(shippingMethod.value) : 0;

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

// Función para iniciar el proceso de pago con Mercado Pago
function initiateMercadoPagoPayment() {
    createPreference()
        .then(preferenceId => {
            createCheckoutButton(preferenceId);
        })
        .catch(error => {
            console.error('Error al crear la preferencia:', error);
            alert('Hubo un problema al iniciar el proceso de pago. Por favor, intenta de nuevo.');
        });
}

// Agregar el evento para iniciar el pago cuando se selecciona MercadoPago
document.getElementById('paymentMethod').addEventListener('change', function() {
    if (this.value === 'mercadopago') {
        initiateMercadoPagoPayment();
    }
});

// Asegurarse de que el botón de MercadoPago se oculte cuando se selecciona otro método de pago
document.getElementById('paymentMethod').addEventListener('change', function() {
    const mercadoPagoButton = document.getElementById('mercadopago-button');
    if (this.value === 'mercadopago') {
        mercadoPagoButton.style.display = 'block';
    } else {
        mercadoPagoButton.style.display = 'none';
    }
});