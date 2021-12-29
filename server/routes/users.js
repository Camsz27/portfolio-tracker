var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

// Create a user with the given input
router.post('/', userController.create_user);

// Update the user with the given id
router.put('/', userController.update_user);

// Gets all the information to populate the main page
router.get('/:id', userController.get_user);

// Gets all the transactions the user has done
router.get('/:id/transactions', userController.get_user_transactions);

// Login the user
router.post('/login', userController.login_user);

// Deletes the asset with the given id
router.delete('/', userController.delete_asset_from_user);

// Get summary of the current balance of the portfolio
router.get('/:id/summary', userController.summary);

module.exports = router;
