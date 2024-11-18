const mercadopago = require('mercadopago');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { items, payer } = JSON.parse(event.body);

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid or empty items array');
    }

    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
    });

    const preference = {
      items: items,
      payer: payer,
      back_urls: {
        success: 'https://monamour.netlify.app/success',
        failure: 'https://monamour.netlify.app/failure',
        pending: 'https://monamour.netlify.app/pending'
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
          { id: 'atm' }
        ],
        installments: 3
      },
      notification_url: 'https://monamour.netlify.app/.netlify/functions/webhook'
    };

    console.log('Creating preference with:', JSON.stringify(preference));

    const response = await mercadopago.preferences.create(preference);

    console.log('Preference created successfully:', response.body.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.body.id
      })
    };
  } catch (error) {
    console.error('Error creating preference:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'An error occurred while creating the preference',
        details: error.message
      })
    };
  }
};