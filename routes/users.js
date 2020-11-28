var express = require('express');
var userRouter = express.Router();
const userController = require('../controller/userController');
const userMiddleware = require('../middlewares/userMiddleware');

/* GET, POST, PUT, DELETE requests */
userRouter.get('/', userController.getAll) 
userRouter.get('/:user_id', userMiddleware.checkUser, userController.getOne)
userRouter.post('/', userMiddleware.checkNewUser, userController.createUser)
userRouter.put('/:user_id', userMiddleware.checkUser, userController.updateUser)
userRouter.delete('/:user_id', userMiddleware.checkUser, userController.deleteUser)

module.exports = userRouter;
