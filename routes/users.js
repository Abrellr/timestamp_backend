var express = require('express');
var router = express.Router();
const usersController = require('../controller/userController')

/* GET users listing. */
router.get('/', usersController.getOne) 

module.exports = router;
