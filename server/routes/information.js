var express = require('express');
var router = express.Router();
const informationController = require('../controllers/information');

/* GET home page. */
router.get('/', informationController.getCoins);
router.get('/initial', informationController.initial);

module.exports = router;
