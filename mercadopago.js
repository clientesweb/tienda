// mercadopago.js

// Initialize the Mercado Pago object
const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db', {
    locale: 'es-AR'
});

let checkoutButtonCreated = false;

// Function to create the payment button
function createCheckoutButton(preferenceId) {
    // Clear existing button if it exists
    const buttonContainer = document.getElementById('mercadopago-button');
    buttonContainer.innerHTML = '';

    const bricksBuilder = mp.bricks();

    bricksBuilder.create("wallet", "mercadopago-button", {
        initialization: {
            preferenceId: preferenceId
        },
        callbacks: {
            onError: (error) => {
                console.error('Error en el pago:', error);
                showNotification('Error en el proceso de pago. Por favor, intente nuevamente.', 'error');
            },
            onReady: () => {
                console.log('Botón de pago listo');
                checkoutButtonCreated = true;
                showNotification('Listo para procesar el pago', 'success');
            }
        }
    });
}

// Function to create the payment preference
async function createPreference() {
    const items = cart.map(item => ({
        title: item.name,
        unit_price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
    }));

    const shippingMethod = document.getElementById('metodoEnvio');
    const selectedShipping = shippingOptions.find(option => option.id === shippingMethod.value);
    const shippingCost = selectedShipping ? selectedShipping.price : 0;

    const formData = new FormData(document.getElementById('checkoutForm'));
    const customerData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/.netlify/functions/create-preference', {
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
                    name: customerData.nombre,
                    surname: customerData.apellido,
                    email: customerData.email,
                    phone: {
                        area_code: "",
                        number: customerData.telefono
                    },
                    identification: {
                        type: "DNI",
                        number: customerData.dni
                    },
                    address: {
                        street_name: customerData.calle,
                        street_number: customerData.numero,
                        zip_code: customerData.codigoPostal
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        showNotification('Error al procesar la orden. Por favor, intente nuevamente.', 'error');
        throw error;
    }
}

// Function to show and hide the loading indicator
function toggleLoadingIndicator(show) {
    const button = document.getElementById('checkoutButton');
    button.disabled = show;
    button.innerHTML = show ? 'Procesando...' : 'Finalizar compra';
}

// Function to show notifications
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Event to start the payment process
document.getElementById('checkoutForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!checkoutButtonCreated) {
        toggleLoadingIndicator(true);
        try {
            const preferenceId = await createPreference();
            createCheckoutButton(preferenceId);
        } catch (error) {
            console.error('Error al crear la preferencia:', error);
        } finally {
            toggleLoadingIndicator(false);
        }
    }
});

// Function to validate the form before submission
function validateForm() {
    const form = document.getElementById('checkoutForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

// Add form validation before submission
document.getElementById('checkoutButton').addEventListener('click', function(e) {
    if (!validateForm()) {
        e.preventDefault();
        showNotification('Por favor, complete todos los campos requeridos.', 'error');
    }
});

// Initialize shipping options
updateShippingOptions();