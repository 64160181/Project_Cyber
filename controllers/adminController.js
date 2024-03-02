module.exports = {
    adminView : function(req, res) {
        res.render('admin', { title: 'Admin', user: req.session.user });
    }
};
