const connection = require('./ConMysql');


module.exports = {
    // Query to get all posts
    getAllPosts: (callback) => {
        const query = 'SELECT * FROM posts';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching posts:', error);
                return callback(error, null);
            }

            return callback(null, results);
        });
    },

    // Query to add a new post
    addNewPost: (topic, details, post_pic, users_uid, callback) => {
        const query = `INSERT INTO posts (topic, details, post_pic, users_uid) VALUES ('${topic}', '${details}', '${post_pic}', '${users_uid}')`;
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error creating post:', error);
                return callback(error, null);
            }

            return callback(null, results);
        });
    },
    // Query to find post by id and user_uid
    findPostByIdAndUserUid: (id, user_uid, callback) => {
        const query = `SELECT * FROM posts WHERE id = '${id}' AND users_uid = '${user_uid}'`;
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error finding post:', error);
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
}