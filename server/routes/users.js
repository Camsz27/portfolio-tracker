var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Create a user with the given input
router.post('/', userController.create_user);

// Update the user with the given id
router.put('/', userController.update_user);

module.exports = router;
