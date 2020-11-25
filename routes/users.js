var express = require('express');
var userRouter = express.Router();
const userController = require('../controller/userController')

/* GET users listing. */
userRouter.get('/', userController.getAll) 
userRouter.get('/:user_id', userController.getOne)


module.exports = userRouter;
