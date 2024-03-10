const usermodel = require('../models/user');
const route = require('color-convert/route');
const bcypt = require('bcrypt');

module.exports = {
	loginView: (req, res) => {
		res.render('login', {
			title: 'Login',
		});
	},
	loginStage: (req, res) => {
		const inputData = {
			username: req.body.username,
			password: req.body.password,
		};
		usermodel.validateUsername(inputData, (error, result) => {
			if (error) {
				console.error('Error validating username:', error);
				return res.status(500).json({
					message: 'Internal Server Error',
				});
			}
			if (!result) {
				req.flash('error', 'Username does not exist');
				return res.render('login', { messages: req.flash('error') });
			}
			usermodel.login(inputData, (error, result) => {
				if (error) {
					console.error('Error logging in:', error);
					return res.status(500).json({
						message: 'Internal Server Error',
					});
				}
				if (!result) {
					req.flash('error', 'Invalid password');
					return res.render('login', { messages: req.flash('error') });
				}
				if (bcypt.compareSync(inputData.password, result.password)) {
					// req.flash('success', 'Login successful');
					// return res.render('login', { messages: req.flash('success') });
					req.session.user = result;
					// console.log(req.session.user);
					return res.redirect('/');
				}
				req.flash('error', 'Invalid password');
				return res.render('login', { messages: req.flash('error') });
			});

		});
	}
};