async function createPreference() {
    console.log('Creating preference...');
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        console.log('Preference creation response status:', response.status);

        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = await response.json();
                console.error('Error creating preference:', errorData);
                errorMessage = errorData.error || 'Error creating preference';
            } catch (jsonError) {
                console.error('Error parsing error response:', jsonError);
                errorMessage = `HTTP error! status: ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Preference created successfully:', data);
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Request timed out');
            throw new Error('La solicitud ha tardado demasiado. Por favor, inténtalo de nuevo.');
        }
        console.error('Error in createPreference:', error);
        throw error;
    }
}