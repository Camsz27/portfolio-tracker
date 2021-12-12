var express = require('express');
var router = express.Router();
const transactionsController = require('../controllers/transaction');

// GET transaction
router.get('/', transactionsController.get_transaction);

// Create a new transaction
router.post('/', transactionsController.create_transaction);

// Delete a transaction with the given id
router.delete('/', transactionsController.delete_transaction);

// Update a transaction with the given id
router.put('/', transactionsController.update_transaction);

module.exports = router;
