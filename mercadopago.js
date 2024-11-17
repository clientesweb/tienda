document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar que el formulario se envíe de inmediato

    // Obtener los datos del formulario
    const formData = new FormData(this);

    // Enviar los datos a Formspree
    fetch('https://formspree.io/f/xrbglzrk', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta de Formspree es exitosa, continuar con la creación de la preferencia de pago
            createPreference()
                .then(preferenceId => {
                    createCheckoutButton(preferenceId); // Crear el botón de Mercado Pago
                    toggleLoadingIndicator(false); // Ocultar el indicador de carga
                })
                .catch(error => {
                    console.error('Error al crear la preferencia:', error);
                    toggleLoadingIndicator(false); // Ocultar el indicador de carga
                });
        } else {
            // Si algo salió mal con Formspree, mostrar un mensaje de error
            alert('Hubo un error al enviar los datos. Inténtalo de nuevo.');
            toggleLoadingIndicator(false); // Ocultar el indicador de carga
        }
    })
    .catch(error => {
        alert('Hubo un error en la conexión. Inténtalo de nuevo.');
        toggleLoadingIndicator(false); // Ocultar el indicador de carga
    });

    // Mostrar el indicador de carga mientras se espera la respuesta de Formspree
    toggleLoadingIndicator(true);
});

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

// Función para crear el botón de pago
function createCheckoutButton(preferenceId) {
    const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db', {
        locale: 'es-AR'
    });

    const bricksBuilder = mp.bricks();

    bricksBuilder.create("wallet", "mercadopago-button", {
        initialization: {
            preferenceId: preferenceId
        },
        callbacks: {
            onError: (error) => console.error('Error en el pago:', error),
            onReady: () => {
                console.log('Botón de pago listo');
            }
        }
    });
}

// Función para mostrar y ocultar el indicador de carga
function toggleLoadingIndicator(show) {
    const button = document.getElementById('checkoutButton');
    if (show) {
        button.disabled = true;
        button.innerHTML = 'Procesando...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Finalizar compra';
    }
}