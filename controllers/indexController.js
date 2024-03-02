module.exports = {
	indexView : function(req, res) {
		res.render('index', { title: 'Home', user: req.session.user });
	},
};
