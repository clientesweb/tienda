const mercadopago = require('mercadopago');

// Configura el ACCESS_TOKEN de Mercado Pago
mercadopago.configure({
  access_token: 'APP_USR-5308541448286221-101717-666e41c570037d35949b15ebddcba543-741519399'  // Reemplaza esto con tu ACCESS_TOKEN real
});

// Función para manejar la creación de la preferencia
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { items } = req.body;

    // Crear la preferencia en Mercado Pago
    const preference = {
      items: items,
      back_urls: {
        success: 'https://tienda-eight-mu.vercel.app/success', // Reemplaza con tu URL real
        failure: 'https://tienda-eight-mu.vercel.app/failure', // Reemplaza con tu URL real
        pending: 'https://tienda-eight-mu.vercel.app/pending'  // Reemplaza con tu URL real
      },
      auto_return: 'approved'
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
