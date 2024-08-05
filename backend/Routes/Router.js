const express = require("express")
const router = express.Router()

// controller
const userSignupController = require("../Controller/UserSignup")
const userSignInController = require("../Controller/userSignin")
const userProfileController = require("../Controller/userProfile")

// middleware
const verifyToken = require("../Middleware/VerifyToken")
const userLogoutController = require("../Controller/userLogout")

// routes
router.post("/signup", userSignupController)
router.post("/signin",userSignInController)
router.post("/userprofile",verifyToken,userProfileController)
router.get("/logout",userLogoutController)

module.exports = router