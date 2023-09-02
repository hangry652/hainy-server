const { sendError } = require('../helpers/errors.helper');
const User = require('../models/user/User.model');
const { decryptJwt } = require('./jwtEncrypter');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return sendError(res, 401,
    'Missing "authorization" header'  
  );

  try {
    const { userId } = decryptJwt(token);
    const { status } = await User.findById(userId);

    switch (status) {
      case 'blocked':
        return sendError(res, 403,
          'Forbidden. Account blocked'  
        );

      case 'active':
        req.userId = userId;
        next();
    }

  } catch (err) {
    sendError(res, 403,
      'Invalid authorization token'  
    );
  }
};