const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// WhatsApp API credentials
const phoneNumberId = '436620666197107';
const accessToken = 'EAAR9WBG5XZB8BOwxg3H9kcBVVfy8iLoamVKRHtgz5jywZCRXqmaFlfK85GaYPYQ1fnelZAZCeMvwZAASEXNFWZAXqvCLFnwpBaZCmhZCtOxS6mJrmYgFNKhVZAbrmnNZBaZCxHErnYQDtYc664ZBSWZAYAAdlD66h8KH69WKQDjWBaauKWtAhAuLg56xhJBZAK'
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
