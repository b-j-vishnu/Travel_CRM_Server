const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 4000
const RegisterRouter = require('./router/RegistrationRouter')
const LeadsRouter = require('./router/LeadsRouter')
const CustomerRouter = require('./router/CustomerRouter')
const ItineraryRouter = require('./router/ItineraryRouter')
const SearchRouter = require('./router/SearchRouter')
const InvoiceRouter = require('./router/InvoiceRouter')

const { config } = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const allowedOrigins = ['http://localhost:5173', 'https://travelservice.netlify.app'];
config();

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGODB_URL)
    .then((res) => {
        console.log(`DB is Connected`);
        console.log(`Database Name: ${res.connection.db.databaseName}`)
    }).catch((err) => {
        console.log("error in connection");

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

app.use('/', RegisterRouter);
app.use('/leads', LeadsRouter)
app.use('/itinerary', ItineraryRouter)
app.use('/customer', CustomerRouter)
app.use('/search', SearchRouter)
app.use('/invoice', InvoiceRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

//// Get the current time in IST
//const currentIST = new Date();

//// Get current hours, minutes, seconds, and milliseconds in IST
//const hours = currentIST.getHours();
//const minutes = currentIST.getMinutes();
//const seconds = currentIST.getSeconds();
//const ms = currentIST.getMilliseconds();

//// Constructing a date from the fixed date and current time components
//const fixedDate = new Date("2024-05-24");
//const dd = new Date(fixedDate.getTime() + (5.5 * 60 * 60 * 1000)); // Apply IST offset
//dd.setHours(hours, minutes, seconds, ms); // Set to the current IST time

//// Logging the individual time components
//console.log("IST", hours);
//console.log("IST", minutes);
//console.log("IST", seconds);
//console.log("IST", ms);

//// Constructing the date and time string in a valid format
//const dateandtime = `2024-05-24T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}Z`;
//const ddd = new Date(dateandtime); // Create a Date object
//console.log(ddd);
