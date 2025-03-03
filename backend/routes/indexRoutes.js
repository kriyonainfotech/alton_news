const express = require('express')

const routes = express.Router();
const {veryfyToken} = require('../middleware/Auth')

routes.use('/auth',require('./authRoutes'))
routes.use('/news',require('./newsRoute'))

module.exports = routes;