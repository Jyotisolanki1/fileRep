const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorHandler');
dotenv.config();


const PORT = process.env.PORT;
const app = express();
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions))
db();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoute)

app.use(notFound);
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`your application running on ${PORT}`)
})