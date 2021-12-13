var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', userController.login_user);

// Create a user with the given input
router.post('/', userController.create_user);

// Update the user with the given id
router.put('/', userController.update_user);

module.exports = router;
