var express = require('express');
var router = express.Router();
const assetController = require('../controllers/asset');

/* GET assets listing. */
router.get('/', function (req, res, next) {
  res.send('This is the transactions one');
});

// Create a new asset
router.post('/', assetController.create_asset);

// Delete an asset with the given id and the transactions of that asset
//router.delete('/', assetController.delete_transaction);

module.exports = router;
