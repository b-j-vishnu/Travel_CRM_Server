const express = require('express')
const { signupController, loginController, logoutController, getDashboard } = require('../controller/RegisterController')

const router = express.Router()

router.get('/getDashboard', getDashboard)
router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/logout', logoutController)



module.exports = router