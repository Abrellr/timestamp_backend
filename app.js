require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const helmet = require('helmet'); // creates headers that protect from attacks (security)
//const cors = require('cors') // allows/disallows cross-site communication

const userRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const taskRouter = require('./routes/tasks');
const authenticationRouter = require('./routes/authentication');

const app = express();

//app.use(cors())
//app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter)
app.use('/auth', authenticationRouter)

module.exports = app;
