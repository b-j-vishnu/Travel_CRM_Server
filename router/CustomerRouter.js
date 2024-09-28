const express = require('express')
const router = express.Router()
const { addCustomer, getCustomer, deleteCustomer, bundleCustomersDelete, filterCustomers, editCustomer } = require('../controller/CustomerController')
const upload = require('../multer')

router.get('/', getCustomer)
router.post('/addCustomer', upload.single('visa'), addCustomer)
router.delete('/deleteCustomer/:userId', deleteCustomer)
router.put('/editCustomer/:userId', upload.single('visa'), editCustomer)
router.get('/filterCustomers', filterCustomers)
router.delete('/bundleCustomersDelete', bundleCustomersDelete)

module.exports = router