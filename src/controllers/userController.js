// Utils
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

//Repository's
const userRepository = require("../repositories/userRepository");

// Services
const authService = require("../middleware/auth");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

exports.postNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const findUser = await userRepository.findUserByEmail(email);

    if (findUser) 
      return res.status(400).send({ error: 'User already exists!'})

    const user = await userRepository.createUser(req.body);

    user.password = undefined;

    return res.send({ 
      user, 
      token: generateToken({ id: user._id }) 
    })
    
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed!' })
  }
};


exports.authenticate = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findUserByEmailAutenticate(email);

      if (!user) 
        return res.status(400).send({ error: 'User not found!'})
      
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword )
        return res.status(400).send({ error: 'Invalid password!'})

      user.password = undefined;

      res.send({ 
        user, 
        token: generateToken({ id: user._id }) 
      })

    } catch (err) {
      res.status(400).send({ message: "Fail in register a User!" });
    }
};