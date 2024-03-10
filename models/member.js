const connection = require('./ConMysql');
module.exports = {
    showUser: function (req, res) {
        connection.query('SELECT * FROM Users', (error, results) => {
            if (error) {
                console.error('Error fetching posts: ', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('all_member', { users: results, user: req.session.user})
            }
        });
    },
}