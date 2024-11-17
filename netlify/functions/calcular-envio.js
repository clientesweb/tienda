const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { zipcode } = JSON.parse(event.body);

    if (!zipcode) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Zipcode is required' }) };
    }

    // Here you would typically make a call to a shipping API
    // For this example, we'll use a mock calculation based on the zipcode
    const shippingCost = calculateShippingCost(zipcode);

    return {
      statusCode: 200,
      body: JSON.stringify({ cost: shippingCost })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to calculate shipping cost' })
    };
  }
};

function calculateShippingCost(zipcode) {
  // This is a mock function. In a real scenario, you'd integrate with a shipping API
  // or use a more sophisticated calculation method.
  const baseRate = 500; // Base shipping rate in ARS
  const zipcodeNumber = parseInt(zipcode);
  
  if (zipcodeNumber >= 1000 && zipcodeNumber < 2000) {
    return baseRate; // Base rate for Buenos Aires City
  } else if (zipcodeNumber >= 2000 && zipcodeNumber < 3000) {
    return baseRate + 200; // Slightly higher for Buenos Aires Province
  } else if (zipcodeNumber >= 3000 && zipcodeNumber < 4000) {
    return baseRate + 400; // Higher for further provinces
  } else {
    return baseRate + 600; // Highest rate for remote areas
  }
}

// Log to console when the function is loaded
console.log("Calcular envío function loaded successfully!");