const { 
  sendError, 
  isRequestValid 
} = require('../../helpers/errors.helper');
const User = require('../../models/user/User.model');
const { hashPassword } = require('../../utils/argonEncoder');
const jwt = require('jsonwebtoken');


class UsersController {
  async register (req, res) {
    try {
      if (!isRequestValid(req)) return sendError(
        res, 400, 'Invalid request data'
      );

      const { username, email, password } = req.body;

      const hashedPassword = hashPassword(password);

      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
      });
      
      const userId = newUser._id.toString();
      
      const token = jwt.sign({
        userId: userId
      }, process.env.SECRET);

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
}


module.exports = new UsersController();