const express = require('express')
const { getInvoices, addInvoices, deleteInvoice, bulkDeleteInvoice, editInvoice, filterInvoice, generateExcelSheets } = require('../controller/InvoiceController')
const router = express.Router()

router.get('/', getInvoices)
router.get('/filterInvoice', filterInvoice)
router.post('/addInvoices', addInvoices)
router.delete('/deleteInvoice/:userId', deleteInvoice)
router.put('/editInvoice/:userId', editInvoice)
router.delete('/bulkDeleteInvoice', bulkDeleteInvoice)
router.post('/generateExcelSheet', generateExcelSheets)
module.exports = router