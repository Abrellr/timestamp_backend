var express = require('express');
var projectRouter = express.Router();
const projectController = require('../controller/projectController')

/* GET projects listing. */
projectRouter.get('/', projectController.getAll) 
projectRouter.get('/:project_id', projectController.getOne)


module.exports = projectRouter;