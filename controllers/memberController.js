const member = require('../models/member');

module.exports = {
    all_memberview: function(req, res) {
        member.showUser(req, res);
    }
}