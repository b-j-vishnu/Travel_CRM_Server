const leads = require('../model/LeadsModels')

const AddLeads = async (req, res) => {
    console.log(req.body)
    try {
        const newLead = await new leads({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            enquiryType: req.body.enquiryType,
            mobile: req.body.mobile,
            email: req.body.email,
            executiveName: req.body.executiveName,
            dealStage: req.body.dealStage,
            dealValue: req.body.dealValue,
            followUpDate: new Date(req.body.followUpDate),
            expectedClosureDate: new Date(req.body.expectedClosureDate),
            package: req.body.package,
            plannedNoOfDays: req.body.plannedNoOfDays,
            destination: req.body.destination,
            billingAmount: req.body.billingAmount,
            paid: req.body.paid,
            balanceAmount: req.body.balanceAmount

        });
        if (!newLead) return res.status(400).json({ message: "New lead have error" });
        await newLead.save();
        res.status(201).json({
            message: "Leads Created Successfully",
            data: newLead
        });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}

const getLeads = async (req, res) => {
    const allLeads = await leads.find()
    return res.status(200).json({ allLeads })
}
const filterLeads = async (req, res) => {
    console.log(req.body)
    const filteredLeads = await leads.find({
        dealStage: req.body.dealStage,
        enquiryType: req.body.enquiryType,
        package: req.body.package,
        mobile: req.body.mobileNumber,
        userId: req.body.userId
    })

    console.log(filteredLeads)
    return res.status(200).json({ filteredLeads })
}
const deleteLead = async (req, res) => {
    console.log(req.params)
    const deletedLead = await leads.deleteOne({ userId: req.params.userId })
    return res.status(200).json({ message: 'Successfully deleted' })
}
const bundleLeadsDelete = async (req, res) => {
    console.log(req.body.dataToDelete)
    const userIds = req.body.dataToDelete
    const deletedDeals = await leads.deleteMany({ userId: { $in: userIds } })
    return res.status(200).json({ message: "successfully deleted " })
}
module.exports = { AddLeads, getLeads, filterLeads, deleteLead, bundleLeadsDelete }