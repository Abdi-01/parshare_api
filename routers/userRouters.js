const express = require("express");
const routers = express.Router();
const { userControllers } = require("../controllers");
const { authToken, auth } = require("../helper/authToken");

//Insert routers here
routers.post('/register', userControllers.registerUser)
routers.post("/login", userControllers.loginUser);
routers.post("/keep-login", authToken, userControllers.keepLogin);

//Insert routers here
routers.post('/register', userControllers.registerUser)
routers.patch('/verified', auth, userControllers.verification)


module.exports = routers;
