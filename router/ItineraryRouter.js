const express = require('express')
const { addItinerary, getItinerary, deleteItinerary, bulkDelete, filterItinerary, editItinerary } = require('../controller/ItineraryController')
const router = express.Router()


router.get('/', getItinerary)
router.post('/addItinerary', addItinerary)
router.put('/editItinerary/:userId', editItinerary)
router.delete('/deleteItinerary/:userId', deleteItinerary)
router.delete('/bulKdeleteItinerary', bulkDelete)
router.get('/filterItinerary', filterItinerary)

module.exports = router


















