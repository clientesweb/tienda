const mercadopago = require('mercadopago');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items } = JSON.parse(event.body);

    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
    });

    const preference = {
      items: items,
      back_urls: {
        success: "https://tu-sitio.com/success",
        failure: "https://tu-sitio.com/failure",
        pending: "https://tu-sitio.com/pending"
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: response.body.id })
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al crear la preferencia de pago' })
    };
  }
};