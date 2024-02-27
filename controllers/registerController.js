const user = require('../models/user');
const usermodel = require('../models/user');
// const bcrypt = require('bcrypt');
const registerUser = (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
  const user = {
    username,
    email,
    password
  };
  usermodel.createUser(user);
  res.send('User registered successfully');
};

module.exports = registerUser;