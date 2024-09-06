const client = require('../model/clientModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();
const signupController = async (req, res) => {
    const { email, password, fullName, mobile } = req.body;
    try {
        const dublicateClient = await client.findOne({ email: email })
        if (dublicateClient) return res.status(409).json({ "message": "client Already Exit" })
        const hashPassword = await bcrypt.hash(password, 10)
        const registering = await new client({
            fullName: fullName,
            email: email,
            password: hashPassword,
            mobile: mobile
        })
        registering.save();
        return res.status(200).json({ "message": "Signup Successfully" })
    } catch (error) {
        throw error;
    }

}

const loginController = async (req, res) => {
    console.log(req.body)

    const existsClient = await client.findOne({ email: req.body.email })
    if (!existsClient) return res.status(404).json({ "message": "client not found" })

    const CheckPassword = await bcrypt.compare(req.body.password, existsClient.password)
    if (!CheckPassword) return res.status(401).json({ "message": "Password Incorrect" })

    const token = jwt.sign({ email: existsClient.email }, process.env.token, { expiresIn: '1d' })
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return res.status(200).json({ "message": "login successfull" })

}
const logoutController = async (req, res) => {
    res.clearCookie('token', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json({ "message": 'logout successfully' })
}

const verifyToken = async (req, res) => {
    const token = req?.cookies?.token
    console.log(token);

    if (!token) return res.status(401).json({ "message": "No Token" })
    jwt.verify(token, process.env.token, (err, decoded) => {
        if (err) return res.status(401).json({ "message": "Token has expired" })
        return res.status(200).json({ "token": token, "message": "no token expired" })
    })

}
module.exports = { signupController, loginController, logoutController, verifyToken }