const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const validatingToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    next();
  });
};

module.exports = validatingToken;