// mern-login-backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController= require("../Controllers/authController.js")

// POST /api/login
router.post('/login',userController.loginUser);
router.post('/signup',userController.signup);

module.exports = router;
