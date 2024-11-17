const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items, payer, shipments, total_amount } = JSON.parse(event.body);

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid or empty items array');
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: items,
        payer: payer,
        shipments: shipments,
        back_urls: {
          success: `${process.env.URL}/success`,
          failure: `${process.env.URL}/failure`,
          pending: `${process.env.URL}/pending`
        },
        auto_return: "approved",
        total_amount: total_amount
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`MercadoPago API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in create-preference:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Error creating preference: ${error.message}` })
    };
  }
};