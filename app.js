require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const artistRoute = require('./routes/artist.route')
const uploadRoute = require('./routes/upload.route')
const userRoute = require('./routes/user.route')
const globalErrorHandler = require('./middlewares/globalErrorHandler')

const app = express();

const corsOption = {
    origin: "*",
    credentials: true
  };

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption))

app.use('/api/v1/artists', artistRoute);
app.use('/api/v1/uploads', uploadRoute);
app.use('/api/v1/users', userRoute);

app.use(globalErrorHandler);

app.get('/', (req, res)=>{
    res.send('Hello world')
})


module.exports = app;