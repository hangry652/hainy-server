const { body } = require('express-validator'); 

const registerValidator = [
  body('username').isLength({ min: 5, max: 30 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 30 })
];

module.exports = {
  registerValidator
}