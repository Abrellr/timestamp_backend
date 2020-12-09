const express = require('express');
const authenticationRouter = express.Router();
const authenticationController = require('../controller/authenticationController')

// POST /auth/login
authenticationRouter.post('/login', authenticationController.login)

module.exports = authenticationRouter;