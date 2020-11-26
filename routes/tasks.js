var express = require('express');
var taskRouter = express.Router();
const taskController = require('../controller/taskController');
const taskMiddleware = require('../middlewares/taskMiddleware');

/* GET users listing. */
taskRouter.get('/', taskController.getAll) 
taskRouter.get('/:task_id', taskMiddleware.checkTask, taskController.getOne)
taskRouter.post('/', taskController.createTask)
taskRouter.put('/:task_id', taskMiddleware.checkTask, taskController.updateTask)
taskRouter.delete('/:task_id', taskMiddleware.checkTask, taskController.deleteTask)


module.exports = taskRouter;