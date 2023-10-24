const express = require("express");
const checkUserAuth = require("../middlewares/auth-middleware")
const checkClient = require("../middlewares/client_middleware")
const { getClient } = require("../controllers/clientController")
const router = express.Router();





router.get("/client/me", getClient);

module.exports = router;



