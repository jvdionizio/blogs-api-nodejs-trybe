const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const auth = (loginData) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({ data: loginData }, SECRET, jwtConfig);

  return token;
};

module.exports = auth;