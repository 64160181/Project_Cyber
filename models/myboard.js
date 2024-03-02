const connection = require('../ConMysql');

module.exports = {
    getPostsByUser: function(userId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM posts WHERE user_uid = ${users_uid}`;
            connection.query(query, (error, results) => {
                if (error) {
                    console.error('Error fetching posts:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
}