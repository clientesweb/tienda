const axios = require('axios');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { zipcode } = JSON.parse(event.body);

    try {
        const response = await axios.post('https://api.mercadolibre.com/sites/MLA/shipping_options', {
            zip_code: zipcode,
            item_dimensions: {
                height: 10,
                width: 10,
                length: 10,
                weight: 1
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
            }
        });

        const shippingCost = response.data.options[0].cost;

        return {
            statusCode: 200,
            body: JSON.stringify({ cost: shippingCost })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al calcular el costo de envío' })
        };
    }
};