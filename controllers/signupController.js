const usermodel = require('../models/user');
const route = require('color-convert/route');

module.exports = {
	signupView: (req, res) => {
		res.render('signup', {
			title: 'Sign Up',
		});
	},
	ValidityState: (req, res) => {
		console.log(req.body);
		const inputData = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			confirmpassword: req.body.confirm_password,
		};

		usermodel.validateUsername({ username: inputData.username }, (err, user) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			}

			if (user) {
				req.flash('error', 'Username already exists');
				return res.render('signup', { messages: req.flash('error') });
			}
		});

		usermodel.validateEmail({ email: inputData.email }, (err, user) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			}

			if (user) {
				req.flash('error', 'Email already exists');
				return res.render('signup', { messages: req.flash('error') });
			}
		});
		
		if (inputData.password === inputData.confirmpassword) {
			usermodel.createUser(inputData);
			req.flash('success', 'User created successfully');
			res.render('login', { messages: req.flash('success') });

		} else {
			req.flash('error', 'Password does not match');
			res.render('signup', { messages: req.flash('error') });
		}
	},
};
// // Continue with the rest of your code here
// if (inputData.password === inputData.confirmpassword) {
// 	// usermodel.createUser(inputData);
// 	req.flash('success', 'User created successfully');
// 	res.render('signup', { messages: req.flash('success') });
// } else {
// 	req.flash('error', 'Password does not match');
// 	res.render('signup', { messages: req.flash('error') });
// }

// req.flash('success', 'User created successfully');
// res.render('signup', {messages: req.flash('success')});