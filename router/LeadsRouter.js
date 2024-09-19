const express = require('express')
const { AddLeads, getLeads, filterLeads, deleteLead, bundleLeadsDelete } = require('../controller/LeadsController')
const router = express.Router()

router.post('/addLeads', AddLeads)
router.get('/getLeads', getLeads)
router.post('/filterLeads', filterLeads)
router.delete('/deleteLead/:userId', deleteLead)
router.delete('/bundleLeadsDelete', bundleLeadsDelete)



module.exports = router;