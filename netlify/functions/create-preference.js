const mercadopago = require('mercadopago');

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  console.log('Received request body:', event.body);

  try {
    const { items, payer } = JSON.parse(event.body);

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid items:', items);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid or empty items array' })
      };
    }

    // Configure MercadoPago
    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
    });

    // Log access token (first few characters)
    console.log('Access token configured:', process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 8) + '...');

    // Format items for MercadoPago
    const formattedItems = items.map(item => ({
      title: item.title,
      unit_price: Number(item.unit_price),
      quantity: Number(item.quantity),
      currency_id: 'ARS'
    }));

    console.log('Formatted items:', JSON.stringify(formattedItems));

    const preference = {
      items: formattedItems,
      payer: {
        name: payer.name,
        surname: payer.surname,
        email: payer.email,
        phone: {
          number: payer.phone.number
        },
        address: {
          street_name: payer.address.street_name,
          street_number: payer.address.street_number,
          zip_code: payer.address.zip_code
        }
      },
      back_urls: {
        success: `${process.env.URL || 'https://monamourtextil.netlify.app'}/success`,
        failure: `${process.env.URL || 'https://monamourtextil.netlify.app'}/failure`,
        pending: `${process.env.URL || 'https://monamourtextil.netlify.app'}/pending`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
          { id: 'atm' }
        ],
        installments: 3
      },
      notification_url: `${process.env.URL || 'https://monamourtextil.netlify.app'}/.netlify/functions/webhook`,
      statement_descriptor: 'MON AMOUR TEXTIL',
      external_reference: `ORDER-${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    console.log('Creating preference with:', JSON.stringify(preference));

    const response = await mercadopago.preferences.create(preference);
    console.log('Preference created successfully:', response.body.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: response.body.id,
        init_point: response.body.init_point
      })
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error creating preference',
        details: error.message,
        stack: error.stack
      })
    };
  }
};