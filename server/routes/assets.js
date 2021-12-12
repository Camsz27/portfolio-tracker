var express = require('express');
var router = express.Router();
const assetController = require('../controllers/asset');

/* GET assets listing. */
router.get('/', assetController.get_asset);

// Create a new asset
router.post('/', assetController.create_asset);

// Delete an asset with the given id and the transactions of that asset
//router.delete('/', assetController.delete_transaction);

module.exports = router;
