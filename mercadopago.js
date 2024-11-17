// mercadopago.js

// Inicializar el objeto de Mercado Pago
const mp = new MercadoPago('APP_USR-2be91fb1-5bdd-48df-906b-fe2eee5de0db', {
    locale: 'es-AR'
});

let checkoutButtonCreated = false;

// Función para crear el botón de pago
function createCheckoutButton(preferenceId) {
    // Limpiar el botón anterior si existía
    document.getElementById('mercadopago-button').innerHTML = '';

    const bricksBuilder = mp.bricks();
    bricksBuilder.create("wallet", "mercadopago-button", {
        initialization: {
            preferenceId: preferenceId
        },
        callbacks: {
            onError: (error) => {
                console.error('Error en el pago:', error);
                alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
            },
            onReady: () => {
                console.log('Botón de pago listo');
                checkoutButtonCreated = true;
                document.getElementById('mercadopago-button').style.display = 'block';
                document.getElementById('submitFormspree').style.display = 'none';
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
    const shippingCost = parseInt(selectedShipping.value === 'free' || selectedShipping.value === 'local' ? 0 : selectedShipping.textContent.match(/\$(\d+)/)[1].replace(',', ''));

    const formData = new FormData(document.getElementById('checkoutForm'));
    const payer = {
        name: formData.get('nombre'),
        surname: formData.get('apellido'),
        email: formData.get('email'),
        phone: {
            number: formData.get('telefono')
        },
        identification: {
            type: formData.get('dni').length > 10 ? 'CUIT' : 'DNI',
            number: formData.get('dni')
        },
        address: {
            zip_code: formData.get('codigoPostal'),
            street_name: formData.get('calle'),
            street_number: formData.get('numero'),
            apartment: formData.get('departamento'),
            city_name: formData.get('ciudad')
        }
    };

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
            payer: payer
        })
    })
    .then(response => response.json())
    .then(data => data.id);
}

// Función para mostrar y ocultar el indicador de carga
function toggleLoadingIndicator(show) {
    const button = document.getElementById('submitFormspree');
    if (show) {
        button.disabled = true;
        button.innerHTML = 'Procesando...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Continuar al pago';
    }
}

// Función para validar el formulario
function validateForm() {
    const form = document.getElementById('checkoutForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
        } else {
            field.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// Evento para iniciar el proceso de pago
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    toggleLoadingIndicator(true);

    // Enviar datos a Formspree
    const formData = new FormData(this);
    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Si el envío a Formspree es exitoso, crear la preferencia de MercadoPago
            createPreference()
                .then(preferenceId => {
                    createCheckoutButton(preferenceId);
                    toggleLoadingIndicator(false);
                })
                .catch(error => {
                    console.error('Error al crear la preferencia:', error);
                    toggleLoadingIndicator(false);
                    alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
                });
        } else {
            throw new Error('Error en el envío del formulario');
        }
    }).catch(error => {
        console.error('Error:', error);
        toggleLoadingIndicator(false);
        alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
    });
});

// Actualizar el costo de envío cuando cambia el método de envío
document.getElementById('shippingMethod').addEventListener('change', function() {
    updateShippingCost();
});

// Función para actualizar el costo de envío
function updateShippingCost() {
    const shippingSelect = document.getElementById('shippingMethod');
    const selectedOption = shippingSelect.options[shippingSelect.selectedIndex];
    const shippingCost = selectedOption.value === 'free' || selectedOption.value === 'local' ? 0 : parseInt(selectedOption.textContent.match(/\$(\d+)/)[1].replace(',', ''));
    
    // Actualizar el total en el formulario
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;
    document.getElementById('cartTotal').textContent = formatPrice(total);
}

// Función para formatear el precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateShippingCost();
});