const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require ('../src/routes/userRoute');
const vehiclesRoute = require ('../src/routes/vehicleRoute');
const swaggerRoute = require('../src/routes/swagger');

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false }));

app.use('/user', userRoute);
app.use('/vehicle', vehiclesRoute);
app.use('/swagger', swaggerRoute);

module.exports = app;