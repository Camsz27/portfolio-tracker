var express = require('express');
var router = express.Router();
const assetController = require('../controllers/asset');

// Create a new asset
router.post('/', assetController.create_asset);

// Delete an asset with the given id and the transactions of that asset
router.delete('/', assetController.delete_asset);

// Updates an asset with the given id
router.put('/', assetController.update_asset);

router.get('/', assetController.trial);

/* GET assets listing. */
router.get('/:id', assetController.get_asset);

module.exports = router;
