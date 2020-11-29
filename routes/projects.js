var express = require('express');
var projectRouter = express.Router();
const projectController = require('../controller/projectController');
const projectMiddleware = require('../middlewares/projectMiddleware');

/* GET projects listing. */
projectRouter.get('/', projectController.getAll) 
projectRouter.get('/:project_id', projectMiddleware.checkProject, projectController.getOne)
projectRouter.get('/:user_id', projectController.rightJoinProject)
projectRouter.post('/', projectController.createOne)
projectRouter.put('/:project_id', projectMiddleware.checkProject, projectController.updateProject)
projectRouter.delete('/:project_id', projectMiddleware.checkProject, projectController.deleteProject)


module.exports = projectRouter;