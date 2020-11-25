var express = require('express');
var taskRouter = express.Router();
const taskController = require('../controller/taskController')

/* GET users listing. */
taskRouter.get('/', taskController.getAll) 
taskRouter.get('/:task_id', taskController.getOne)


module.exports = taskRouter;