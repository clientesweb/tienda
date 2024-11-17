exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { items, shipments, payer } = JSON.parse(event.body);

    mercadopago.configure({
        access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
    });

    try {
        const preference = {
            items: items,
            shipments: {
                cost: shipments.cost,
                mode: "not_specified",
            },
            payer: payer,
            back_urls: {
                success: `${process.env.URL}/success`,
                failure: `${process.env.URL}/failure`,
                pending: `${process.env.URL}/pending`
            },
            auto_return: "approved",
            payment_methods: {
                excluded_payment_types: [{ id: "ticket" }],
                installments: 12
            },
            statement_descriptor: "MITIENDAONLINE",
            external_reference: "Order-" + Date.now()
        };

        const response = await mercadopago.preferences.create(preference);
        console.log('Respuesta de MercadoPago:', response.body);

        if (!response.body.id) {
            throw new Error('No se recibió un ID de preferencia');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                id: response.body.id,
                init_point: response.body.init_point
            })
        };
    } catch (error) {
        console.error('Error creando preferencia:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};