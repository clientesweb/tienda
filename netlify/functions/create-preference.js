const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Ensure the request method is POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let items;

  // Safely parse the request body
  try {
    const body = JSON.parse(event.body);
    items = body.items;

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid or empty items array');
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' })
    };
  }

  // Validate environment variables
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN || !process.env.URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: items,
        back_urls: {
          success: `${process.env.URL}/success`,
          failure: `${process.env.URL}/failure`,
          pending: `${process.env.URL}/pending`
        },
        auto_return: "approved",
        statement_descriptor: "Mon Amour Textil",
        external_reference: `ORDER-${Date.now()}`,
        expires: true,
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error creating preference' })
    };
  }
};