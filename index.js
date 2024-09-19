const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// WhatsApp API credentials
const phoneNumberId = '436620666197107';
const accessToken = 'EAAR9WBG5XZB8BOzQddmh4hLv5SAdrV7pAw0LOjZC4YsozrKD70SA6btVRZBfOtZBaFv24YH9kik7RM9PQXW4ZCP43JYvekxUYvZAtTO1HYQZAxUopZAkZBqfWXZA7WAKKhTnBUTB1RZAZC8w8T1rrWTILeGtuC9nL3XyaxBVkrplugp1aZChjJJpcY5V5me8ZBhJ9o4kW3J7WrT58qSNKjKEZB5TMhPYoTNrsgZD';

// API to send image via URL
app.post('/send-image', async (req, res) => {
    const { recipientPhoneNumber, imageUrl, caption } = req.body;
console.log("APP _ CALL")
    try {
        // Sending the image via WhatsApp API
        const response = await axios.post(
            `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
            {
                messaging_product: 'whatsapp',
                to: recipientPhoneNumber,
                type: 'template',
                template: {
                    name: caption,
                    language: {
                        code: "en_US"
                    }
                }
              
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

       

        res.status(200).json({
            message: 'Image sent successfully!',
            response: response.data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to send image',
            error: error.response ? error.response.data : error.message
        });
    }
});

// Start the API server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
