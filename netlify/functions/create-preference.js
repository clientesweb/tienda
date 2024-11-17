import fetch from 'node-fetch';

export const handler = async (event, context) => {
  // Ensure the request method is POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let items;
  try {
    const body = JSON.parse(event.body);
    items = body.items;

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid or empty items array');
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
    return { 
      statusCode: 400, 
      body: JSON.stringify({ error: 'Invalid request body' })
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
      const errorData = await response.json();
      console.error('MercadoPago API error:', errorData);
      throw new Error('Error from MercadoPago API');
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