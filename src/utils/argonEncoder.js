const argon2 = require('argon2');
const { error } = require('../helpers/logs.helper');


const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;

  } catch (err) {
    error(err);
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    const isPasswordValid = await argon2.verify(hashedPassword, password);
    return isPasswordValid;  
    
  } catch (err) {
    error(err);
  }
};


module.exports = {
  hashPassword,
  verifyPassword
}