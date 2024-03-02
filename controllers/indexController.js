const connection = require('../models/ConMysql');
module.exports = {
	indexView : function(req, res) {
		connection.query('SELECT * FROM Posts', (error, results) => {
			if (error) {
				console.error('Error fetching posts: ', error);
				res.status(500).send('Internal Server Error');
			} else {
				res.render('index', { Posts: results,user: req.session.user});
			}
	})
}
}
