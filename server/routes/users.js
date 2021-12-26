var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

// Create a user with the given input
router.post('/', userController.create_user);

// Update the user with the given id
router.put('/', userController.update_user);

// Gets all the information to populate the main page
router.get('/:id', userController.get_user);

// Login the user
router.post('/login', userController.login_user);

// Deletes the asset with the given id
router.delete('/', userController.delete_asset_from_user);

module.exports = router;
