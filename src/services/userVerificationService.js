const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const userVerification = (token) => {
    const dec = jwt.verify(token, secret);
    const userId = dec.data.id;
  
    return userId;
};

module.exports = userVerification;