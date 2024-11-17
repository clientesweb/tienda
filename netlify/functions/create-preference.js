const mercadopago = require('mercadopago');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { items, shipments } = JSON.parse(event.body);

  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
  });

  try {
    const preference = {
      items: items,
      shipments: shipments
    };

    const response = await mercadopago.preferences.create(preference);
    return {
      statusCode: 200,
      body: JSON.stringify({ id: response.body.id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};