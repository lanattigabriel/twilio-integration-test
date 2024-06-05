const express = require('express');
require('dotenv').config();
const twilioRoutes = require('./routes/api');

const port = 3000;
const app = express();
app.use(express.json());
app.use('/twilio', twilioRoutes); 

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    });
