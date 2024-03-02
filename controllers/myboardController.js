const connection = require('../models/ConMysql');
const Post = require('../models/post');
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
	},
	deletepost:
		(req, res) => {
			Post.deletePost(req.params.id, (error, result) => {
				if (error) {
					console.error('Error deleting post:', error);
					return res.status(500).json({
						message: 'Internal Server Error',
					});
				}
				res.redirect('/');
			});
		},
	}
