async function createPreference() {
    try {
        const response = await fetch('/.netlify/functions/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart.map(item => ({
                    title: item.name,
                    unit_price: item.price,
                    quantity: item.quantity,
                })),
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error creating preference:', errorData);
            throw new Error(errorData.error || 'Error creating preference');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createPreference:', error);
        throw error;
    }
}