const connection = require('../models/ConMysql.js');
module.exports = {
	indexView: function (req, res) {
		connection.query('SELECT * FROM Posts', (error, results) => {
			console.log('session: ', req.session.user);
			if (error) {
				console.error('Error fetching posts: ', error);
				res.status(500).send('Internal Server Error');
			} else {
				res.render('index', { Posts: results, user: req.session.user });
			}
		});
	},
	logout: function (req, res) {
		req.session.destroy();
		res.redirect('/');
	}
};
