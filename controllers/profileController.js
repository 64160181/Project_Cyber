

module.exports = {
    profileView : function(req, res) {
        res.render('profile', { title: 'Profile', user: req.session.user });
    },
    editProfileView : function(req, res) {
        res.render('editProfile', { title: 'Edit Profile', user: req.session.user });
    }
};