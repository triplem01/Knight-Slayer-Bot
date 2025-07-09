const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.post('/webhook', (req, res) => {
  const message = req.body.Body;
  const sender = req.body.From;

  // Handle incoming message
  if (message.toLowerCase() === 'hello') {
    client.messages
      .create({
        from: 'whatsapp:your-twilio-phone-number',
        body: 'Hello back!',
        to: sender
      })
      .then(() => {
        res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
      })
      .done();
  } else {
    client.messages
      .create({
        from: 'whatsapp:your-twilio-phone-number',
        body: 'I didn\'t understand that. Type "hello" to get a response.',
        to: sender
      })
      .then(() => {
        res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
      })
      .done();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
