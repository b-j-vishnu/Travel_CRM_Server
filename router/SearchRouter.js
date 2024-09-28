const express = require('express')
const { searchById } = require('../controller/SearchController')
const router = express.Router()

router.get('/searchById', searchById)

module.exports = router