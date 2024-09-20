const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 3090;

app.use(bodyParser.json());

const url = 'https://messages-sandbox.nexmo.com/v1/messages';
const username = '72a1929f';
const password = 'g94mOW2A6vHpRmdX';
// const accountSid = 'AC84f3e28dc0a51ab9f26bb90090f34b6a';
//       const authToken = '6c30e195b60573f35cf7fb9529dd453b';
//       const client = require('twilio')(accountSid, authToken);
// const WHATSAPP_API_URL = 'https://graph.facebook.com/v20.0/436620666197107/messages '; // Your WhatsApp API URL
// const TOKEN = 'EAAR9WBG5XZB8BO3ZCqKCNqoHNZCBNZCiOvamQtpMzTID46tHvdyFx4GCuRMZB4h8V2NbkkLBaCqSKng4UhMkdH4R66iNdyDV8CgPn3KeZBXpnfXlxSviSuZC4T49iXC0IijcpX6qcjFJVTdeti4o5p8sxBRA2t9ghNnvpVSwxehjRpJLsDIXH9tGJe6cp3G2cb7I6XMtLbnw3Ft1rNNYLAJav8CoisZD'; // Your access token
app.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  const messageData = {
    "messaging_product": "whatsapp",
    
    "to": phoneNumber,
    "type": "template",
    "name": "Register Succefully",
    "language": {
      "code": "en_US"
    }
    
  }

 

  try {
      // const response = await axios.post(WHATSAPP_API_URL, messageData, {
      //     headers: {
      //         'Authorization': `Bearer ${TOKEN}`,
      //         'Content-Type': 'application/json',
      //     },
      // });
      
      
      // client.messages
      // .create({
      //     body: 'Your appointment is coming up on July 21 at 3PM',
      //     from: 'whatsapp:+14155238886',
      //     to: 'whatsapp:+916370202834'
      // })
      // .then(message => {
      //     res.status(200).json({ success: true, messageId: message.sid });
      // })
      // .catch(error => {
      //     console.error(error);
      //     res.status(500).json({ success: false, error: error.message });
      // });
  
      
      // const options = {
      //   method: 'POST',
      //   url: 'https://api.wassenger.com/v1/messages',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Token: 'd7477fc249e0db734871345b9cbaf1c3f4c55950e404a460633775d59284c5b25083b4231a20b2ef'
      //   },
      //   data: {phone: '+916370202834', message: 'Hello world, this is a sample message'}
      // };
      
      // try {
      //   const { data } = await axios.request(options);
      //   res.status(200).json({ success: true, messageId: data });
      // } catch (error) {
      //   console.error(error);
    // }
    function removePlusSign(phoneNumber) {
      return phoneNumber.replace('+', '');
  }
    const data = {
      from: '14157386102',
      to: removePlusSign(phoneNumber),
      message_type: 'text',
      text: message,
      channel: 'whatsapp'
  };
  

    axios.post(url, data, {
      auth: {
          username: username,
          password: password
      },
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })
  .then(response => {
    console.log('Message sent:', response.data);
    res.status(200).json({ success: true, messageId: response.data });

  })
  .catch(error => {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: error});
  });
  } catch (error) {
    console.error(error);
      res.status(500).json({ success: false, error: error});
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
