const { 
  sendError, 
  isRequestValid 
} = require('../../helpers/errors.helper');
const User = require('../../models/user/User.model');
const { 
  hashPassword, 
  verifyPassword 
} = require('../../utils/argonEncoder');
const { encryptJwt } = require('../../utils/jwtEncrypter');

class UsersController {
  async register (req, res) {
    try {
      if (!isRequestValid(req)) return sendError(
        res, 400, 'Invalid request data'
      );

      const { username, email, password } = req.body;

      // Check is user exists
      const candidate = await 
        User
          .findOne({ $or: [
            { username },
            { email }
          ]});

      if (candidate) return sendError(res, 400, 
        `Username or e-mail already taken`
      );

      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
      });
      
      const { _id } = await newUser.save();

      const userId = _id.toString();
      const token = encryptJwt({ userId });

      res
        .status(201)
        .json({
          message: `User (${userId}) created`,
          token: token
        });

    } catch (error) {
      sendError(res, 500);
    }
  }

  async login (req, res) {
    try {
      if (!isRequestValid(req)) return sendError(
        res, 400, 'Invalid request data'
      );

      const { username, password } = req.body;

      const userData = await 
        User
          .findOne({ username })
          .select('username password');
    
      if (!userData) return sendError(res, 404, 
        `Account "${username}" not registered`
      );

      const isPasswordValid = await verifyPassword(
        password,
        userData.password
      );

      if (!isPasswordValid) return sendError(res, 403, 
        'Invalid password'
      );

      const userId = userData._id.toString();
      const token = encryptJwt({ userId });

      res
        .status(200)
        .json({
          message: `Successfully logged in`,
          token: token
        });

    } catch (error) {
      sendError(res, 500)
    }
  }
}


module.exports = new UsersController();