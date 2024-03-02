const connection = require('../models/ConMysql');
module.exports = {
	myboardView: (req, res) => {
		if (!req.session.user) {
			// Redirect to login page if user is not logged in
			return res.redirect('/login');
		} else {
			connection.query('SELECT * FROM Users', (error, userResults) => {
				if (error) {
					console.error('Error fetching users: ', error);
					res.status(500).send('Internal Server Error');
				} else {
					connection.query('SELECT * FROM Posts', (error, postResults) => {
						if (error) {
							console.error('Error fetching posts: ', error);
							res.status(500).send('Internal Server Error');
						} else {
							res.render('my_board', { Users: userResults, Posts: postResults, user: req.session.user });
						}
					});
				}
			});
		}
	}
}