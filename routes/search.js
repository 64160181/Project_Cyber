var express = require('express');
var router = express.Router();
const searchViwe = require('../controllers/searchController.js');

router.get('/search_data', searchViwe.search_data);
router.get('/search_users', searchViwe.search_users);

module.exports = router;