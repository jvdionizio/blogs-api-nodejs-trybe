const loginService = require('../services/loginService.js');
const tokenService = require('../services/tokenService');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
     return res.status(400).json({ 
       message: 'Some required fields are missing',
    });
  }

  const loginData = await loginService.login({ email, password });

  if (!loginData) return res.status(400).json({ message: 'Invalid fields' });

  const token = tokenService(loginData);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};