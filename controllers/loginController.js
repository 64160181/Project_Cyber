const usermodel = require('../models/user');
const route = require('color-convert/route');
const bcypt = require('bcrypt');

module.exports = {
	loginView : (req, res) => {
		res.render('login', {
			title: 'Login',
		});
	}
};