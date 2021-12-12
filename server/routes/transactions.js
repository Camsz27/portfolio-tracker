var express = require('express');
var router = express.Router();
const transactionsController = require('../controllers/transaction');

/* GET transactions listing. */
router.get('/', function (req, res, next) {
  res.send('This is the transactions one');
});

// Create a new transaction
router.post('/', transactionsController.create_transaction);

// Delete a transaction with the given id
router.delete('/', transactionsController.delete_transaction);

module.exports = router;
