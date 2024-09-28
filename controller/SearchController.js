const leads = require('../model/LeadsModels')
const customers = require('../model/CustomerModel')

const searchById = async (req, res) => {
    console.log(req.query)
    if (!req.query.type || !req.query.userId) return res.status(400).json({ message: "missing search field" })
    if (req.query.type === "Leads") {
        const foundLead = await leads.findOne().where('userId').equals(`#${req.query.userId}`)
        console.log(foundLead)
        if (!foundLead) {
            return res.status(404).json({ message: "Lead not found" })
        }
        return res.status(200).json({ foundedPerson: foundLead })
    }
    if (req.query.type === "Customers") {
        const foundCustomer = await customers.findOne().where('userId').equals(`#${req.query.userId}`)
        console.log(foundCustomer)
        if (!foundCustomer) {
            return res.status(404).json({ message: "Customer not found" })
        }
        return res.status(200).json({ foundedPerson: foundCustomer })
    }
}


module.exports = { searchById }