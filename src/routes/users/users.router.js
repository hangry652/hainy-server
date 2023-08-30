const express = require('express');
const router = express.Router();
const controller = require('./users.controller');
const { registerValidator } = require('./users.validator');

router.post('/', registerValidator, controller.register);


module.exports = router;