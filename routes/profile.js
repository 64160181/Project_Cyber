const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const { route } = require('./index.js');
const connection = require('../models/ConMysql.js');

// Define your routes here
router.get('/profile', profileController.profileView);
router.get('/profile/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE uid = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('searchprofile', {user: results[0],session: req.session.user});
        }
    });
}
);
router.get('/editProfile', profileController.editProfileView);
router.post('/update_profile', profileController.updateprofilepicture);

router.post('/update_user', profileController.updateuser);
router.post('/update_password', profileController.updatepassword);

module.exports = router;