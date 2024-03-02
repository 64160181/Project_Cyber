const showpostview = (req, res) => {
    const postId = req.params.id;
    // ... rest of your code
    res.render('show_post', {
      user: req.session.user,
      postId,
    });
}

module.exports = showpostview;