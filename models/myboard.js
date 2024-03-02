const connection = require('../ConMysql');

module.exports = {
    getPostsByUser: function(users_uid) {
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
    editpost: function(post_id, topic, details, post_pic) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE posts SET topic = '${topic}', details = '${details}', post_pic = '${post_pic}' WHERE post_id = ${post_id}`;
            connection.query(query, (error, results) => {
                if (error) {
                    console.error('Error updating post:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    deletePost: function(post_id){
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM posts WHERE post_id = ${post_id}`;
            connection.query(query, (error, results) => {
                if (error) {
                    console.error('Error deleting post:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
}