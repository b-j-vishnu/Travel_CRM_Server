const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 4000
const ClientRouter = require('./router/ClientRouter')
const { config } = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const allowedOrigins = ['http://localhost:5173'];
config();

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGODB_URL)
    .then((res) => {
        console.log(`DB is Connected`);
    }).catch((err) => {
        console.log(err);

    });
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use('/client', ClientRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

