const itinerary = require('../model/ItineraryModel')

const getItinerary = async (req, res) => {
    const itinerarys = await itinerary.find();
    return res.status(200).json({ itinerarys })
}
const addItinerary = async (req, res) => {
    console.log(req.body)
    const newItinerary = new itinerary({
        proposalDate: new Date(req.body.proposalDate),
        validDate: new Date(req.body.validDate),
        acceptPaymentVia: req.body.acceptPaymentVia,
        executiveName: req.body.executiveName,
        mobile: req.body.mobile,
        email: req.body.email,
        itineraryFor: req.body.itineraryFor,
        destinationTemplate: req.body.destinationTemplate,
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        plannedNoOfDays: req.body.plannedNoOfDays,
        billingAmount: req.body.billingAmount,
        stage: req.body.stage,
        subject: req.body.subject,
        introMsg: req.body.introMsg

    })
    newItinerary.save().then((success) => {
        console.log(success);
        return res.status(200).json({ message: "Saved SuccessFully" })
    }
    ).catch((err) => {
        console.log(err.message);
        return res.status(400).json({ message: "Error in save" })
    }
    )
}

const deleteItinerary = async (req, res) => {
    console.log(req.params)
    const deletedItinerary = await itinerary.deleteOne({ userId: req.params.userId })
    return res.status(200).json({ message: 'Successfully deleted' })
}

const bulkDelete = async (req, res) => {
    console.log(req.body.dataToDelete)
    const userIds = req.body.dataToDelete
    const deletedItineraries = await itinerary.deleteMany({ userId: { $in: userIds } })
    return res.status(200).json({ message: "successfully deleted " })
}
const filterItinerary = async (req, res) => {
    if (!req.query.validDate.length && !req.query.total.length && !req.query.executiveName.length && !req.query.userId.length) return res.status(400).json({ message: "invalid filter" })
    try {
        console.log(req.query)
        const date = new Date(req.query.validDate)
        const userId = `#${req.query.userId}`
        const executiveName = req.query.executiveName
        const total = req.query.total
        console.log(date)

        const foundedItineraries = await itinerary.find({
            $expr: {
                $and: [
                    { $eq: ["$userId", userId] },
                    { $eq: ["$validDate", date] },
                    { $eq: ["$executiveName", executiveName] },
                    { $eq: ["$billingAmount", total] }

                ]
            }
        })
        return res.status(200).json({ foundedItineraries })
    }
    catch (err) {
        console.log(err)
    }
}
const editItinerary = async (req, res) => {
    console.log(req.params)
    const { userId } = req.params
    try {
        const updatedItinerary = await itinerary.findOneAndUpdate({ userId: { $eq: userId } }, {
            $set: {                    // Update fields using $set
                proposalDate: new Date(req.body.proposalDate),
                validDate: new Date(req.body.validDate),
                acceptPaymentVia: req.body.acceptPaymentVia,
                executiveName: req.body.executiveName,
                mobile: req.body.mobile,
                email: req.body.email,
                itineraryFor: req.body.itineraryFor,
                destinationTemplate: req.body.destinationTemplate,
                userId: req.body.userId,
                fullName: req.body.fullName,
                billingAmount: req.body.billingAmount,
                stage: req.body.stage,
                subject: req.body.subject,
                introMsg: req.body.introMsg
            }
        },
            { new: true }
        )

        updatedItinerary.save()
        return res.status(200).json({ message: "Updated SuccessFully" })
    }
    catch (err) { console.log(err) }
}
module.exports = { addItinerary, getItinerary, deleteItinerary, bulkDelete, filterItinerary, editItinerary }