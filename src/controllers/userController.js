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

  const getAllUsers = async (_req, res) => {
    const usersList = await userService.getAllUsers();
  
    return res.status(200).json(usersList);
  };

  const getUserById = async (req, res) => {
    const { id } = req.params;
  
    const user = await userService.getUserById(id);
  
    if (!user) return res.status(404).json({ message: 'User does not exist' });
  
    return res.status(200).json(user);
  };

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
  }; 