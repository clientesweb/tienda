// mercadopago.js

// Inicializar el objeto de Mercado Pago
const mp = new MercadoPago('TU_PUBLIC_KEY_AQUI', {
    locale: 'es-AR'
});

// Función para crear el botón de pago
function createCheckoutButton(preferenceId) {
    const bricksBuilder = mp.bricks();

    bricksBuilder.create("wallet", "mercadopago-button", {
        initialization: {
            preferenceId: preferenceId
        },
        callbacks: {
            onError: (error) => console.error('Error en el pago:', error),
            onReady: () => console.log('Botón de pago listo')
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
    const shippingCost = parseInt(selectedShipping.textContent.match(/\$(\d+)/)[1]);

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
    .then(response => response.json())
    .then(data => data.id);
}

// Evento para iniciar el proceso de pago
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    createPreference()
        .then(preferenceId => {
            createCheckoutButton(preferenceId);
        })
        .catch(error => {
            console.error('Error al crear la preferencia:', error);
        });
});