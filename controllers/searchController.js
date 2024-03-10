const connection = require('../models/ConMysql.js');

module.exports = {
	search_data: function (req, res) {
		var search_query = req.query.search_query;
		var query = `SELECT id, topic FROM posts WHERE topic LIKE '%${search_query}%' LIMIT 10`;
		connection.query(query, function (error, data) {
			res.json(data);
		});	
	},
	search_users: function (req, res) {
		var search_query = req.query.search_query;
		var query = `SELECT username FROM users WHERE username LIKE '%${search_query}%' LIMIT 10`;
		connection.query(query, function (error, data) {
			if (error) {
				console.error('Error fetching users:', error);
				res.status(500).json({ error: 'Error fetching users' }); 
			} else {
				res.json(data);
			}
		});
	},
};