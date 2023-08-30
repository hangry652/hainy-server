const { validationResult } = require('express-validator');

const isRequestValid = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return false;
  return true;
}

const sendError = (res, code, message) => {
  res
    .status(code)
    .json({
      message: message || 'Something went wrong :/'
    });
}

module.exports = {
  isRequestValid,
  sendError 
};