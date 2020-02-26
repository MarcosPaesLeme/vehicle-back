'use strict'

const express = require('express');
const vehiclesController = require('../controllers/vehicleController');
const router = express.Router();
const authMiddleware =  require('../middleware/auth');

router.use(authMiddleware);

router.get('/', vehiclesController.getVehicles);
router.get('/datails/:veichleId', vehiclesController.getVehicleDetail);
router.post('/', vehiclesController.postNewVehicle);
router.put('/:veichleId', vehiclesController.putAVehicle);
router.patch('/:veichleId', vehiclesController.patchAVehicle);

module.exports = router;