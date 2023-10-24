const express = require("express");
const checkUserAuth = require("../middlewares/auth-middleware")
const checkClient = require("../middlewares/client_middleware")
const { getManager } = require("../controllers/managerController")
const router = express.Router();





router.get("/manager/me", getManager);

module.exports = router;



