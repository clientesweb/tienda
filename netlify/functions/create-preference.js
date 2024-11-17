const mercadopago = require('mercadopago');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { items, payer, shipments } = JSON.parse(event.body);

    try {
        mercadopago.configure({
            access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
        });

        const preference = {
            items: items,
            payer: payer,
            shipments: shipments
        };

        const response = await mercadopago.preferences.create(preference);

        return {
            statusCode: 200,
            body: JSON.stringify(response.body)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al crear la preferencia' })
        };
    }
};