const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Log the incoming request
  console.log('Incoming request body:', event.body);

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { items, payer, shipments, total_amount } = JSON.parse(event.body);

    // Validate required data
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid or empty items array');
    }

    // Log the data being sent to MercadoPago
    console.log('Sending to MercadoPago:', {
      items,
      payer,
      shipments,
      total_amount
    });

    // Validate access token
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error('MERCADOPAGO_ACCESS_TOKEN is not configured');
    }

    const mpRequestBody = {
      items: items.map(item => ({
        title: item.title,
        unit_price: Number(item.unit_price),
        quantity: Number(item.quantity),
        currency_id: "ARS"
      })),
      payer: {
        name: payer.name,
        surname: payer.surname,
        email: payer.email,
        phone: payer.phone,
        address: payer.address
      },
      shipments: {
        cost: Number(shipments.cost),
        mode: "not_specified"
      },
      back_urls: {
        success: `${process.env.URL || 'https://monamourtextil.netlify.app'}/success`,
        failure: `${process.env.URL || 'https://monamourtextil.netlify.app'}/failure`,
        pending: `${process.env.URL || 'https://monamourtextil.netlify.app'}/pending`
      },
      auto_return: "approved",
      notification_url: `${process.env.URL || 'https://monamourtextil.netlify.app'}/.netlify/functions/webhook`,
      statement_descriptor: "Mon Amour Textil",
      external_reference: new Date().getTime().toString()
    };

    // Log the final request to MercadoPago
    console.log('Final MercadoPago request:', JSON.stringify(mpRequestBody, null, 2));

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mpRequestBody)
    });

    // Log the raw response
    console.log('MercadoPago response status:', response.status);
    const responseText = await response.text();
    console.log('MercadoPago response body:', responseText);

    if (!response.ok) {
      throw new Error(`MercadoPago API error: ${response.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in create-preference:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: `Error creating preference: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: error.stack
      })
    };
  }
};