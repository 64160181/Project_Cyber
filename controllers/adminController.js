const adminModel = require('../models/admin');
const usermodel = require('../models/user');
const connection = require('../models/ConMysql');


module.exports = {
    adminView : function(req, res) {
        if (!req.session.user || req.session.user.isAdmin !== 'Y') {
            res.redirect('/');
            return;
        }
        adminModel.showUser(req, res);
    },
    adminBoard: function(req, res) {
        if (!req.session.user || req.session.user.isAdmin !== 'Y') {
            res.redirect('/');
            return;
        }
        adminModel.showBoard(req, res);
    },
    viewUserProfile : function(req, res) {
        if (!req.session.user || req.session.user.isAdmin !== 'Y') {
            res.redirect('/');
            return;
        }
        const inputData = {
            uid: req.body.uid,
        };
        adminModel.userView(inputData, (error, result) => {
            if (error) {
                console.error('Error fetching user:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            if (result) {
                return res.render('view_user', { user: result , session: req.session.user});
            }
            return res.status(404).json({
                message: 'User not found',
            });
        });
    },
    editUserView : function(req, res) {
        if (!req.session.user || req.session.user.isAdmin !== 'Y') {
            res.redirect('/');
            return;
        }
        const inputData = {
            uid: req.body.uid,
            username: req.body.username,
            email: req.body.email,
            display_name: req.body.display_name,
        };
        res.render('edit_user', { user: inputData, session: req.session.user});
    },
    editUser : function(req, res) {
        if (!req.session.user || req.session.user.isAdmin !== 'Y') {
            res.redirect('/');
            return;
        }
        const inputData = {
            uid: req.body.uid,
            username: req.body.username,
            email: req.body.email,
            display_name: req.body.display_name,
        };
        adminModel.updateUser(inputData, (error, result) => {
            if (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            if (result) {
                return res.redirect('/adminBKB');
            }
        });
    },
    editPassword : function(req, res) {
        if (!req.session.user || req.session.user.isAdmin !== 'Y') {
            res.redirect('/');
            return;
        }
        console.log(req.body);
        const inputData = {
            uid: req.body.uid,
            newpassword: req.body.password,
            confirmpassword: req.body.confirm_password,
            display_name: req.body.display_name,
            username: req.body.username,
            email: req.body.email,
        };
        if (inputData.newpassword !== inputData.confirmpassword) {
            req.flash('error', 'Password does not match');
            return res.render('edit_user', { user: inputData, messages: req.flash('error'), session: req.session.user});
        } else {
            adminModel.updatePassword(inputData, (error, result) => {
                if (error) {
                    console.error('Error updating password:', error);
                    return res.status(500).json({
                        message: 'Internal Server Error',
                    });
                }
                if (result) {
                    return res.redirect('/adminBKB');
                }
            });
        }
    },
    deleteUser : function(req, res) {
        if (!req.session.user || req.session.user.isAdmin !== 'Y') {
            res.redirect('/');
            return;
        }
        const inputData = {
            uid: req.body.uid,
        };
        adminModel.disable_foreign_key((error, result) => {
            if (error) {
                console.error('Error disabling foreign key:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            if (result) {
                adminModel.deleteUser(inputData, (error, result) => {
                    if (error) {
                        console.error('Error deleting user:', error);
                        return res.status(500).json({
                            message: 'Internal Server Error',
                        });
                    }
                    if (result) {
                        adminModel.enable_foreign_key((error, result) => {
                            if (error) {
                                console.error('Error enabling foreign key:', error);
                                return res.status(500).json({
                                    message: 'Internal Server Error',
                                });
                            }
                            if (result) {
                                return res.redirect('/adminBKB');
                            }
                        });
                    }
                });
            } 
        }
        );
    },
    deleteboard: (req, res) => {
        console.log('req',req.body);
        const inputData = {
            post_id: req.body.post_id,
            User_uid: req.body.Users_uid,
        };
        adminModel.disable_foreign_key((error, result) => {
            if (error) {
                console.error('Error disabling foreign key:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            if (result) {
                adminModel.deleteboard(inputData, (error, result) => {
                    if (error) {
                        console.error('Error deleting post:', error);
                        return res.status(500).json({
                            message: 'Internal Server Error',
                        });
                    }
                    if (result) {
                        adminModel.enable_foreign_key((error, result) => {
                            if (error) {
                                console.error('Error enabling foreign key:', error);
                                return res.status(500).json({
                                    message: 'Internal Server Error',
                                });
                            }
                            if (result) {
                                return res.redirect('/admin_board');
                            }
                        });
                    }
                });
            }
        });
    }
};