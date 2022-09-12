const userService = require('../services/userService.js');
const userValidate = require('../middlewares/userValidate');
const tokenService = require('../services/tokenService.js');

  const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    if (!displayName || displayName.length < 8) {
      return res.status(400).json({ 
        message: '"displayName" length must be at least 8 characters long',
    });
    }
  
    const validationUserStatus = userValidate.userValidate({ email, password });
  
    if (validationUserStatus) { 
      return res.status(400).json({ 
        message: validationUserStatus, 
    });
  }

    const isUserCreated = await userService.getUser(email);
  
    if (isUserCreated) { return res.status(409).json({ message: 'User already registered' }); }
  
    const user = await userService.createUser({ email, password, displayName, image });
    const token = tokenService(user);

    return res.status(201).json({ token });
  };

  module.exports = {
    createUser,
  }; 