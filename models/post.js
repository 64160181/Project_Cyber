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
    editPost: (topic, details, post_pic, users_uid,id, callback) => {
        const query = `UPDATE posts SET topic = '${topic}', details = '${details}', post_pic = '${post_pic}' WHERE users_uid = '${users_uid}' AND id = '${id}'`;
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error editing post:', error);
                return callback(error, null);
            } 
            
            return callback(null, results);
        });
    },
    deletePost: (user_uid,id, callback) => {
        const query = `DELETE FROM posts WHERE id = '${id}' AND users_uid = '${user_uid}'`;
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error deleting post:', error);
                return callback(error, null);
            } 
            
            return callback(null, results);
        });
    }
};