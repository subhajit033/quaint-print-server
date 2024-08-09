require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const globalErrorHandler = require('./middlewares/globalErrorHandler')

const app = express();

const corsOption = {
    origin: "*",
    credentials: true
  };

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption))

app.use(globalErrorHandler);

app.get('/', (req, res)=>{
    res.send('Hello world')
})


module.exports = app;