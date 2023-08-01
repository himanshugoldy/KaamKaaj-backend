const express = require('express');
const router = express.Router();
const {login,register,getMyProfile,logout} = require('../controllers/user');
const isAuthenticated = require('../middlewares/auth');

router.post("/register", register);
router.post("/login", login);
router.get("/me",isAuthenticated,getMyProfile)
router.get("/logout",isAuthenticated,logout);

module.exports = router;