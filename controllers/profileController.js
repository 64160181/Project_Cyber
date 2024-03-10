const { log } = require('async');
const usermodel = require('../models/user');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

var upload = multer({ storage: storage });
module.exports = {
    profileView: function (req, res) {
        if (!req.session.user) {
            // Redirect to login page if user is not logged in
            return res.redirect('/login');
        } else {
            res.render('profile', { title: 'Profile', user: req.session.user });
        }
    },
    editProfileView: function (req, res) {
        res.render('edit_profile', { title: 'Edit Profile', user: req.session.user });
    },
    updateuser: function (req, res) {
        const inputData = {
            uid: req.body.uid,
            display_name: req.body.display_name,
            username: req.body.username,
            email: req.body.email,
            profile_picture: req.body.profile_picture,

        };
        usermodel.validateUsernameUpdate(inputData, (error, result) => {
            if (error) {
                console.error('Error validating username:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            if (result) {
                req.flash('error', 'Username already exists');
                req.session.user = result;
                return res.render('edit_profile', { messages: req.flash('error'), user: req.session.user});
            }
            usermodel.validateEmailUpdate(inputData, (error, result) => {
                if (error) {
                    console.error('Error validating email:', error);
                    return res.status(500).json({
                        message: 'Internal Server Error',
                    });
                }
                if (result) {
                    req.flash('error', 'Email already exists');
                    req.session.user = result;
                    return res.render('edit_profile', { messages: req.flash('error'), user: req.session.user});
                }
                usermodel.updateUser(inputData, (error, result) => {
                    if (error) {
                        console.error('Error updating user:', error);
                        return res.status(500).json({
                            message: 'Internal Server Error',
                        });
                    }
                    if (result) {
                        req.session.user = result;
                        console.log(req.session.user);
                        return res.render('profile', { messages: req.flash('error'), user: req.session.user});
                    }
                });
            });
        });
    },
    updatepassword: function (req, res) {
        const inputData = {
            uid: req.body.uid,
            newpassword: req.body.password,
            confirmpassword: req.body.confirm_password,
        };
        console.log(inputData);
        if (inputData.newpassword !== inputData.confirmpassword) {
            req.flash('error', 'Password does not match');
            return res.render('edit_profile', { user: req.session.user, messages: req.flash('error') });
        } else {
            usermodel.updatePassword(inputData, (error, result) => {
                if (error) {
                    console.error('Error updating password:', error);
                    return res.status(500).json({
                        message: 'Internal Server Error',
                    });
                }
                if (result) {
                    console.log(req.session.user);
                    return res.render('profile', { user: req.session.user });
                }
            });
        }
    },
    updateprofilepicture: function (req, res) {
        upload.single('profile_picture')(req, res, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
 
            const inputData = {
                uid: req.body.uid,
                profile_picture: req.file ? req.file.filename : null,
                username: req.body.username,
                email: req.body.email,
                display_name: req.body.display_name,
            };

            usermodel.updateprofilepicture(inputData, (error, result) => {
                if (error) {
                    console.error('Error updating profile picture:', error);
                    return res.status(500).json({
                        message: 'Internal Server Error',
                    });
                }
                if (result) {
                    req.session.user = result;
                    return res.render('profile', { user: req.session.user });
                }
            });
        });
    },

}