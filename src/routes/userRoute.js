const express = require('express');
const router = express.Router();
const controller = require ('../controllers/userController');

router.post('/register', controller.postNewUser);
router.post('/authenticate', controller.authenticate);

module.exports = router;