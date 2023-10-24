const express = require("express");
const {userRegistration, userLogin, changePassword, loggedUser, sendUserResetPasswordEmail, userPasswordReset, activeTrue} = require("../controllers/authController")
const {checkUserAuth, userById} = require("../middlewares/auth-middleware")
const router = express.Router();

//protected routes middleware level
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

// Public Routes
router.post('/register', userRegistration)
router.post('/login', userLogin)
router.post("/send-reset-password-email", sendUserResetPasswordEmail)
router.post("/reset-password/:id/:token", userPasswordReset)

// Activate account
// router.param('token', userById)
router.get('/profile/mytoken/:token',userById,activeTrue);




// protected routes
router.post("/changepassword", changePassword)
router.get("/loggeduser", loggedUser)


module.exports = router;

