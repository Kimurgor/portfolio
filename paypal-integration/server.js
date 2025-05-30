const express = require('express');
const bodyParser = require('body-parser');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();
app.use(bodyParser.json());

// PayPal client configuration
function getPayPalClient() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    return new paypal.core.PayPalHttpClient(environment);
}

app.post('/api/create-paypal-order', async (req, res) => {
    const { amount, currency } = req.body;
    
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: currency,
                value: amount
            }
        }]
    });

    try {
        const order = await getPayPalClient().execute(request);
        res.json({ id: order.result.id });
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).json({ error: 'Failed to create order.' });
    }
});

app.post('/api/capture-paypal-order', async (req, res) => {
    const { orderID } = req.body;
    
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await getPayPalClient().execute(request);
        const captureID = capture.result.purchase_units[0].payments.captures[0].id;
        res.json({ captureID: captureID });
    } catch (error) {
        console.error('Failed to capture order:', error);
        res.status(500).json({ error: 'Failed to capture order.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));