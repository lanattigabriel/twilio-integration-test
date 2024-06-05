const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post('/send-sms', async (req, res) => {
    console.log('--------req------------', req, '--------------------', res)
  const { to, body } = req.body;

  try {
    const message = await client.messages.create({
      body: body,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+5491133871991'
    });

    res.status(200).json({ message: 'Mensaje enviado', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Error al enviar el mensaje', error: err.message });
  }
});

router.post('/make-call', async (req, res) => {
  const { to, url } = req.body;

  try {
    const call = await client.calls.create({
      url: url,
      to: to,
      from: process.env.TWILIO_NUMBER
    });

    res.status(200).json({ message: 'Llamada realizada', data: call });
  } catch (err) {
    res.status(500).json({ message: 'Error al realizar la llamada', error: err.message });
  }
});

module.exports = router;