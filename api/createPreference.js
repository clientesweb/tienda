const mercadopago = require('mercadopago');

// Configura el ACCESS_TOKEN de Mercado Pago
mercadopago.configure({
  access_token: 'APP_USR-5308541448286221-101717-666e41c570037d35949b15ebddcba543-741519399'  // Cambia esto por tu Access Token real
});

// Función para manejar la creación de la preferencia
exports.handler = async (req, res) => {
  if (req.method === 'POST') {
    const { items } = req.body;

    // Crear la preferencia en Mercado Pago
    const preference = {
      items: items,
      back_urls: {
        success: 'https://tienda-sjo7.vercel.app/success', // Cambia esto a la URL real de éxito
        failure: 'https://tienda-sjo7.vercel.app/failure', // Cambia esto a la URL real de fallo
        pending: 'https://tienda-sjo7.vercel.app/pending'  // Cambia esto a la URL real de pendiente
      },
      auto_return: 'approved'
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id });  // Devuelve el ID de la preferencia
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};