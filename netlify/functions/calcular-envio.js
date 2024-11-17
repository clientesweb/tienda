const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let zipcode;
  try {
    ({ zipcode } = JSON.parse(event.body));
  } catch (error) {
    console.error('Error parsing request body:', error);
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!zipcode) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Zipcode is required' }) };
  }

  try {
    const response = await axios.post('https://api.mercadolibre.com/sites/MLA/shipping_options', {
      zip_code: zipcode,
      item_dimensions: {
        height: 10,
        width: 10,
        length: 10,
        weight: 1
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Mercado Envíos API response:', JSON.stringify(response.data, null, 2));

    if (!response.data.options || response.data.options.length === 0) {
      console.error('No shipping options returned from Mercado Envíos API');
      return { statusCode: 404, body: JSON.stringify({ error: 'No se encontraron opciones de envío' }) };
    }

    const shippingCost = response.data.options[0].cost;

    return {
      statusCode: 200,
      body: JSON.stringify({ cost: shippingCost })
    };
  } catch (error) {
    console.error('Error calling Mercado Envíos API:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al calcular el costo de envío', details: error.message })
    };
  }
};