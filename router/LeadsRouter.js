const express = require('express')
const { AddLeads, getLeads, filterLeads, deleteLead, bundleLeadsDelete, editLead } = require('../controller/LeadsController')
const router = express.Router()

router.get('/getLeads', getLeads)
router.post('/addLeads', AddLeads)
router.post('/filterLeads', filterLeads)
router.put('/editLead/:userId', editLead)
router.delete('/deleteLead/:userId', deleteLead)
router.delete('/bundleLeadsDelete', bundleLeadsDelete)



module.exports = router;