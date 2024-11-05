const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Verificar el método HTTP
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // Verificar las variables de entorno
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN || !process.env.URL) {
    console.error('Faltan variables de entorno necesarias');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error de configuración del servidor' })
    };
  }

  let items;
  try {
    // Parsear el cuerpo de la solicitud
    const requestBody = JSON.parse(event.body);
    items = requestBody.items;

    // Validar los items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Se requiere un array de items no vacío' })
      };
    }

    // Validar la estructura de cada item
    const validItem = item => 
      item.title && 
      typeof item.quantity === 'number' && 
      item.quantity > 0 &&
      item.currency_id && 
      typeof item.unit_price === 'number' &&
      item.unit_price > 0;

    if (!items.every(validItem)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Formato de item inválido' })
      };
    }

  } catch (error) {
    console.error('Error al parsear el cuerpo de la solicitud:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'JSON inválido en el cuerpo de la solicitud' })
    };
  }

  console.log('Creando preferencia con items:', JSON.stringify(items));

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
        external_reference: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        expires: true,
        expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error de Mercado Pago:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Error de la API de Mercado Pago', details: data })
      };
    }

    console.log('Respuesta de Mercado Pago:', JSON.stringify(data));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://magenta-lolly-353b43.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error detallado:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al crear la preferencia', details: error.message })
    };
  }
};