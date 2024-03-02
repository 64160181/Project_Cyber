const { message } = require('statuses');
const usermodel = require('../models/user');
const route = require('color-convert/route');

module.exports = {
	signupView: (req, res) => {
		res.render('signup', {
			title: 'Sign Up',
		});
	},
	ValidityState: (req, res) => {
		const inputData = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			confirmpassword: req.body.confirm_password,
		};
		usermodel.validateUsername(inputData, (error, result) => {
			if (error) {
				console.error('Error validating username:', error);
				return res.status(500).json({
					message: 'Internal Server Error',
				});
			}
			if (result) {
				req.flash('error', 'Username already exists');
				return res.render('signup', { messages: req.flash('error') });	
			}
			usermodel.validateEmail(inputData, (error, result) => {
				if (error) {
					console.error('Error validating email:', error);
					return res.status(500).json({
						message: 'Internal Server Error',
					});
				}
				if (result) {
					req.flash('error', 'Email already exists');
					return res.render('signup', { messages: req.flash('error') });
				}
				if (inputData.password !== inputData.confirmpassword) {
					req.flash('error', 'Password does not match');
					return res.render('signup', { messages: req.flash('error') });
				} else {
					usermodel.createUser(inputData);
					// req.flash('success', 'User created successfully');
					// return res.render('signup', { messages: req.flash('success') });
					   return res.render('login', { messages: 'successfully' });
				}
			});
		});
	}

};