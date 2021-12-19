var express = require('express');
var router = express.Router();
const informationController = require('../controllers/information');

/* GET home page. */
router.get('/initial', informationController.initial);
router.get('/coins', informationController.coins);
router.get('/:id', informationController.getCoin);

module.exports = router;
