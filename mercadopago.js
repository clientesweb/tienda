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
            onError: (error) => console.error('Error en el pago:', error),
            onReady: () => {
                console.log('Botón de pago listo');
                checkoutButtonCreated = true;
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

// Función para mostrar y ocultar el indicador de carga
function toggleLoadingIndicator(show) {
    const button = document.getElementById('nextToPayment');
    if (show) {
        button.disabled = true;
        button.innerHTML = 'Procesando...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Continuar al Pago';
    }
}

// Función para actualizar el paso del checkout
function updateCheckoutStep(step) {
    document.querySelectorAll('.step-content').forEach((el, index) => {
        el.classList.toggle('hidden', index + 1 !== step);
    });
    document.querySelectorAll('.step').forEach((el, index) => {
        el.classList.toggle('bg-primary', index + 1 <= step);
        el.classList.toggle('text-white', index + 1 <= step);
        el.classList.toggle('bg-gray-300', index + 1 > step);
        el.classList.toggle('text-gray-600', index + 1 > step);
    });
}

// Función para enviar información a Formspree
function sendFormspreeData() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    // Agregar los items del carrito y el total al formulario
    formData.append('cartItems', JSON.stringify(cart));
    formData.append('cartTotal', document.getElementById('cartTotal').textContent);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log('Información enviada a Formspree exitosamente');
            updateCheckoutStep(3);
        } else {
            throw new Error('Error al enviar la información a Formspree');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
    });
}

// Evento para continuar al pago
document.getElementById('nextToPayment').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Validar el formulario antes de continuar
    const form = document.getElementById('checkoutForm');
    if (form.checkValidity()) {
        toggleLoadingIndicator(true);
        sendFormspreeData(); // Enviar datos a Formspree
        createPreference()
            .then(preferenceId => {
                createCheckoutButton(preferenceId);
                updateCheckoutStep(2);
                toggleLoadingIndicator(false);
            })
            .catch(error => {
                console.error('Error al crear la preferencia:', error);
                toggleLoadingIndicator(false);
            });
    } else {
        form.reportValidity();
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes agregar cualquier inicialización adicional que necesites
});