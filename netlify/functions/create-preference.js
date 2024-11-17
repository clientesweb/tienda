import mercadopago from 'mercadopago';

export const handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items, shipments, payer } = JSON.parse(event.body);

    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
    });

    const preference = {
      items: items,
      shipments: shipments,
      payer: payer,
      back_urls: {
        success: `${process.env.SITE_URL}/success`,
        failure: `${process.env.SITE_URL}/failure`,
        pending: `${process.env.SITE_URL}/pending`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
          { id: 'atm' }
        ],
        installments: 6
      },
      statement_descriptor: 'Mon Amour Textil',
      external_reference: `ORDER-${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    };

    const response = await mercadopago.preferences.create(preference);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        id: response.body.id,
        init_point: response.body.init_point
      })
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};