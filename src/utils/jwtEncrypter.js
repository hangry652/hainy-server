const jwt = require('jsonwebtoken');
const { error } = require('../helpers/logs.helper');

const encryptJwt = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET);
    return token;

  } catch (err) {
    error(err);
  }
};

const decryptJwt = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET)
    return payload;

  } catch (err) {
    error(err);
  }
}

module.exports = {
  encryptJwt,
  decryptJwt
};