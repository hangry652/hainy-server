const express = require('express');
const router = express.Router();
const controller = require('./users.controller');
const { 
  registerValidator,
  loginValidator
} = require('./users.validator');
const authorization = require('../../utils/authCheck');


router.post('/register', registerValidator, controller.register);
router.post('/login', loginValidator, controller.login);
router.get('/get-by-id/:id', authorization, controller.getById);
router.get('/get-me', authorization, controller.getMe);


module.exports = router;