const route = require('color-convert/route');
const user = require('../models/user');
const usermodel = require('../models/user');
const { validationResult, matchedData } = require('express-validator');

// const registerUser = (req, res) => {
//   const { username, email, password,confirm_password } = req.body;
//   console.log(req.body);

//   // Password validation logic
//   if (password !== confirm_password) {
//     console.log('Passwords do not match');
//     res.send('Passwords do not match');
//     return;
//   }

//   const user = {
//     username,
//     email,
//     password
//   };
//   usermodel.createUser(user);
//   res.redirect('/login');
// };

// module.exports = registerUser;

module.exports = {
  Validateform:function(req,res){
    const errors= validationResult(req);
    if(!errors.isEmpty()){
      var errMsg= errors.mapped();
      var inputData = matchedData(req);
    }else{
      var inputData = matchedData(req);
      usermodel.createUser(inputData);
    }
    res.render('signup', {errors:errMsg, inputData:inputData});
  }
}