var express = require('express');
var router = express.Router();
const assetController = require('../controllers/asset');

// Create a new asset
router.post('/', assetController.create_asset);

// Delete an asset with the given id and the transactions of that asset
router.delete('/', assetController.delete_asset);

// Add a transaction to the asset given with the id
router.put('/', assetController.update_asset);

router.delete('/transaction', assetController.delete_transaction_from_asset);

/* GET assets listing. */
router.get('/:id', assetController.get_asset);

module.exports = router;
