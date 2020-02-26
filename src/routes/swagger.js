'use strict';

const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../../config/swagger.json');

const options = {
    customSiteTitle: 'Api - Documentação',
};

router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;