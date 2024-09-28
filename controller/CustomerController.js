const customers = require("../model/CustomerModel");

const getCustomer = async (req, res) => {
    const customer = await customers.find()
    return res.status(200).json({ customer })
}

const addCustomer = async (req, res) => {
    try {
        const newCustomer = new customers({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            enquiryType: req.body.enquiryType,
            mobile: req.body.mobile,
            email: req.body.email,
            package: req.body.package,
            stage: req.body.stage,
            executiveName: req.body.executiveName,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            noOfAdults: req.body.noOfAdults,
            noOfChildren: req.body.noOfChildren,
            billingAmount: req.body.billingAmount,
            paid: req.body.paid,
            balancePayment: req.body.balancePayment,
        })
        await newCustomer.save()
        return res.status(200).json({ message: "new Customer saved SuccessFully" })
    }
    catch (err) {

        console.log("Error", err)
        //return res.status(400).json({ message: "error in saving customer" })
    }
}
const filterCustomers = async (req, res) => {
    console.log(req.query)
    const package = req.query.package
    const stage = req.query.stage
    const enquiryType = req.query.enquiryType
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)

    const filteredCustomers = await customers.find({
        $expr: {
            $and: [
                { $eq: ["$stage", stage] },
                { $eq: ["$enquiryType", enquiryType] },
                { $eq: ["$package", package] },
                { $eq: ["$startDate", startDate] },
                { $eq: ["$endDate", endDate] }

            ]
        }
    })

    console.log(filteredCustomers)
    return res.status(200).json({ filteredCustomers })
}
const deleteCustomer = async (req, res) => {
    console.log(req.params)
    const deletedcustomer = await customers.deleteOne({ userId: req.params.userId })
    return res.status(200).json({ message: 'Successfully deleted' })
}
const bundleCustomersDelete = async (req, res) => {
    console.log(req.body.dataToDelete)
    const userIds = req.body.dataToDelete
    const deletedDeals = await customers.deleteMany({ userId: { $in: userIds } })
    return res.status(200).json({ message: "successfully deleted " })
}
const editCustomer = async (req, res) => {
    console.log(req.params)
    const { userId } = req.params
    console.log("formData", req.body)
    try {
        const updatedCustomer = await customers.findOneAndUpdate({ userId: { $eq: userId } }, {
            $set: {                    // Update fields using $set
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                enquiryType: req.body.enquiryType,
                mobile: req.body.mobile,
                email: req.body.email,
                package: req.body.package,
                stage: req.body.stage,
                executiveName: req.body.executiveName,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
                noOfAdults: req.body.noOfAdults,
                noOfChildren: req.body.noOfChildren,
                billingAmount: req.body.billingAmount,
                paid: req.body.paid,
                balancePayment: req.body.balancePayment,
            }
        },
            { new: true }
        )

        updatedCustomer.save()
        return res.status(200).json({ message: "Updated SuccessFully" })
    }
    catch (err) { console.log(err) }
}
module.exports = { addCustomer, getCustomer, deleteCustomer, bundleCustomersDelete, filterCustomers, editCustomer }