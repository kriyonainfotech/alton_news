const express = require('express')

const routes = express.Router();
const {veryfyToken} = require('../middleware/Auth')

routes.use('/auth',require('./authRoutes'))
routes.use('/news',require('./newsRoute'))
routes.use('/latest',require('./latestnewsRoutes'))
routes.use('/podcast',require('./podcastRoutes'))
routes.use('/author',require('./authorRoutes'))
routes.use('/category',require('./newscategoryRoutes'))

module.exports = routes;