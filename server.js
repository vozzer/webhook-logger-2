const express = require('express');
const axios = require('axios');
const app = express();

const webhookURL = process.env.WEBHOOK_URL;

app.get('/log', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');
    const referrer = req.get('Referrer') || req.get('Referer') || 'None';

    await axios.post(webhookURL, {
        content: `🔍 New visitor:
**IP:** ${ip}
**User-Agent:** ${userAgent}
**Referrer:** ${referrer}`
    });

    res.send('<h1>Thanks for agreeing to share your info!</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
