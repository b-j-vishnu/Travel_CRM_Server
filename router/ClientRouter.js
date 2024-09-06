const express = require('express')
const { signupController, loginController, logoutController, verifyToken } = require('../controller/ClientContoller')

const router = express.Router()

//router.get('/verify', verifyToken)
router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/logout', logoutController)



module.exports = router