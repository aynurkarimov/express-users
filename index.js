const express = require('express');
const server = express();

const usersRouter = require('./src/routes/users');
const headersMW = require('./src/helpers/headers');

server.disable('etag');

server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(headersMW);
server.use('/users', usersRouter);

server.listen(5555);