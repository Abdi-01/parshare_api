const express = require("express");
const routers = express.Router();
const { changePasswordControllers } = require("../controllers");

routers.post("/send-email", changePasswordControllers.sendEmail);
routers.post("/decode-token", changePasswordControllers.decodeToken);
routers.patch("/reset-password", changePasswordControllers.resetPassword);

module.exports = routers;
