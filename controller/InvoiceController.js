const invoices = require('../model/InvoiceModel')
const XLSX = require('xlsx')

const getInvoices = async (req, res) => {
    try {
        const Invoices = await invoices.find()
        return res.status(200).json({ Invoices })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong when fetching invoices" })
    }
}

const addInvoices = async (req, res) => {
    console.log(req.body)
    const total = Number(req.body.total)
    const pending = Number(req.body.pending)
    let status = ""
    if (total === pending) {
        status = "Paid"
    } else {
        status = "Pending"
    }

    const newInvoice = new invoices({
        proposalDate: new Date(req.body.proposalDate),
        validDate: new Date(req.body.validDate),
        acceptPaymentVia: req.body.acceptPaymentVia,
        executiveName: req.body.executiveName,
        mobile: req.body.mobile,
        email: req.body.email,
        destinationTemplate: req.body.destinationTemplate,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.userId,
        total: req.body.total,
        pending: req.body.pending,
        status: status,
        invoiceTo: req.body.invoiceTo
    })
    const savedInvoice = await newInvoice.save()
    return res.status(200).json({ message: "Successfully saved a new Invoice" })
}
const deleteInvoice = async (req, res) => {
    console.log(req.params)
    const deletedInvoice = await invoices.deleteOne({ userId: req.params.userId })
    return res.status(200).json({ message: 'Successfully deleted' })
}

const bulkDeleteInvoice = async (req, res) => {
    console.log(req.body.dataToDelete)
    const userIds = req.body.dataToDelete
    const deletedInvoices = await invoices.deleteMany({ userId: { $in: userIds } })
    return res.status(200).json({ message: "successfully deleted " })
}
const editInvoice = async (req, res) => {
    console.log(req.params)
    const { userId } = req.params

    try {
        const total = Number(req.body.total)
        const pending = Number(req.body.pending)
        let status = ""
        if (total === pending) {
            status = "Paid"
        } else {
            status = "Pending"
        }
        const updatedInvoice = await invoices.findOneAndUpdate({ userId: { $eq: userId } }, {
            $set: {
                proposalDate: new Date(req.body.proposalDate),
                validDate: new Date(req.body.validDate),
                acceptPaymentVia: req.body.acceptPaymentVia,
                executiveName: req.body.executiveName,
                mobile: req.body.mobile,
                status: status,
                email: req.body.email,
                destinationTemplate: req.body.destinationTemplate,
                fullName: req.body.fullName,
                userId: req.body.userId,
                total: req.body.total,
                pending: req.body.pending,
                invoiceTo: req.body.invoiceTo
            }
        },
            { new: true }
        )

        updatedInvoice.save()
        return res.status(200).json({ message: "Updated SuccessFully" })
    }
    catch (err) { console.log(err) }
}
const filterInvoice = async (req, res) => {

    try {
        console.log(req.query)
        const validDate = new Date(req.query.validDate);
        const userId = `#${req.query.id}`;
        const executiveName = req.query.executiveName;
        const total = req.query.total;
        const status = req.query.status

        const foundedInvoices = await invoices.find({
            $expr: {
                $and: [
                    { $eq: ["$userId", userId] },
                    { $eq: ["$validDate", validDate] },
                    { $eq: ["$executiveName", executiveName] },
                    { $eq: ["$total", total] },
                    { $eq: ["$status", status] }

                ]
            }
        })
        return res.status(200).json({ foundedInvoices })
    }
    catch (err) {
        console.log(err)
    }
}

const generateExcelSheets = async (req, res) => {
    try {
        const userIds = req.body.userIds
        const invoiceDatas = await invoices.find({ userId: { $in: userIds } })
        console.log(req.body.userIds)
        if (invoiceDatas.length === 0) return res.status(404).json({ message: "No datas to generate excel sheets" })
        const invoice = [
            ['UserId', "Name", "Email", "Mobile", "ExecutiveName", "AcceptPaymentVia", "Total", "Pending", "ProposalDate", "ValidDate", "DestinationTemplate", "Status"]
        ]
        invoiceDatas.forEach((data) => invoice.push([data.userId, `${data.firstName} ${data.lastName}`, data.email, data.mobile, data.executiveName, data.acceptPaymentVia, data.total, data.pending, data.proposalDate, data.validDate, data.destinationTemplate, data.status]))

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(invoice)

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices')
        const excelFileBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Set the file name
        const fileName = `Invoices.xlsx`;

        // Send the file directly to the user for download
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelFileBuffer);
    } catch (err) { console.log(err) }

}
module.exports = { getInvoices, addInvoices, deleteInvoice, bulkDeleteInvoice, editInvoice, filterInvoice, generateExcelSheets }