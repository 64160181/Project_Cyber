const express = require('express');
const adminController = require('../controllers/adminController.js');
const router = express.Router();

router.get('/adminBKB', adminController.adminView);
router.post('/view_user_profile', adminController.viewUserProfile);
router.post('/view_edit_user', adminController.editUserView);
router.post('/edit_user', adminController.editUser);
router.post('/edit_password', adminController.editPassword);
router.post('/delete_user', adminController.deleteUser);
module.exports = router;
