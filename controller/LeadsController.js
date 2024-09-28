const leads = require('../model/LeadsModels')
const getNextUserID = require('../controller/getId')

const AddLeads = async (req, res) => {


    try {
        const newLead = await new leads({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            enquiryType: req.body.enquiryType,
            mobile: req.body.mobile,
            email: req.body.email,
            executiveName: req.body.executiveName,
            stage: req.body.stage,
            dealValue: req.body.dealValue,
            followUpDate: new Date(req.body.followUpDate),
            expectedClosureDate: new Date(req.body.expectedClosureDate),
            package: req.body.package,
            plannedNoOfDays: req.body.plannedNoOfDays,
            destination: req.body.destination,
            billingAmount: req.body.billingAmount,
            paid: req.body.paid,
            balancePayment: req.body.balancePayment

        });
        if (!newLead) return res.status(400).json({ message: "New lead have error" });

        await newLead.save();
        res.status(200).json({
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
        stage: req.body.stage,
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
const editLead = async (req, res) => {
    console.log(req.params)
    const { userId } = req.params
    try {
        const updatedLead = await leads.findOneAndUpdate({ userId: { $eq: userId } }, {
            $set: {                    // Update fields using $set
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                enquiryType: req.body.enquiryType,
                mobile: req.body.mobile,
                email: req.body.email,
                executiveName: req.body.executiveName,
                stage: req.body.stage,
                dealValue: req.body.dealValue,
                followUpDate: new Date(req.body.followUpDate),
                expectedClosureDate: new Date(req.body.expectedClosureDate),
                package: req.body.package,
                plannedNoOfDays: req.body.plannedNoOfDays,
                destination: req.body.destination,
                billingAmount: req.body.billingAmount,
                paid: req.body.paid,
                balancePayment: req.body.balancePayment
            }
        },
            { new: true }
        )

        updatedLead.save()
        return res.status(200).json({ message: "Updated SuccessFully" })
    }
    catch (err) { console.log(err) }
}
module.exports = { AddLeads, getLeads, filterLeads, deleteLead, bundleLeadsDelete, editLead }