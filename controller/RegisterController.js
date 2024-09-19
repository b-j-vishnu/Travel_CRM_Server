const client = require('../model/UsersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const signupController = async (req, res) => {
    try {
        console.log(req.body);

        const dublicateClient = await client.findOne({ email: req.body.email })

        if (dublicateClient) return res.status(409).json({ "message": "client Already Exit" })

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        const registering = await new client({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword,
            mobile: req.body.mobile
        })
        registering.save()

        return res.status(200).json({ "message": "Signup Successfully" })
    } catch (err) { console.log(err) }

}

const loginController = async (req, res) => {
    try {
        console.log(req.body)

        const existsClient = await client.findOne({ email: req.body.email })
        if (!existsClient) return res.status(404).json({ "message": "Invalid Email" })

        const CheckPassword = await bcrypt.compare(req.body.password, existsClient.password)
        if (!CheckPassword) return res.status(401).json({ "message": "Password Incorrect" })

        const token = jwt.sign({ id: existsClient._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
            .status(200).json({
                message: "login successfully",
                token
            });
    } catch (err) { console.log(err) }

}
const logoutController = async (req, res) => {
    return res.clearCookie('token', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({ "message": 'logout successfully' })
}

const getDashboard = async (req, res) => {
    try {
        const token = req?.cookies?.token
        console.log(req.cookies.token)
        if (!token) return res.status(401).json({ message: "no token provided" })
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}


module.exports = { signupController, loginController, logoutController, getDashboard }