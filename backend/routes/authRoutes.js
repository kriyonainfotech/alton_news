const express = require('express');
const {registerUser, loginUser , logout, getalluser, getUser} = require('../controllers/AuthController');
const routes = express.Router();
const {verifyToken} = require('../middleware/Auth') 
const {isAdmin} = require('../middleware/Auth') 


routes.post('/registerUser',registerUser);
routes.post('/loginUser',loginUser);

routes.get('/logout',logout);
routes.get('/getalluser',getalluser);
routes.get('/getUser',verifyToken,getUser);


module.exports = routes


