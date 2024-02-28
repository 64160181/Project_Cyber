const { validationResult, matchedData } = require('express-validator');
const usermodel = require('../models/user');
const route = require('color-convert/route');

module.exports = {
	signupView: (req, res) => {
		res.render('signup', {
			title: 'Sign Up',
		});
	},
	Validateform:function(req,res){
		const errors= validationResult(req);
		console.log(errors);
		if(!errors.isEmpty()){
		  var errMsg= errors.mapped();
		  var inputData = matchedData(req);
		  res.render('signup', {errors:errMsg, inputData:inputData});
		}else{
		  var inputData = matchedData(req);
		  usermodel.createUser(inputData);
		  res.redirect('/login');
		}
		// res.render('signup', {errors:errMsg, inputData:inputData});
	  }
};

