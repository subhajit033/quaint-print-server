require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const artistRoute = require('./routes/artist.route');
const uploadRoute = require('./routes/upload.route');
const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin.route');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const { uriToClold } = require('./utils/cloudinary');

const app = express();

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

const corsOption = {
  //it is not allowed to pass any type of cookie or authentication header when origin sets to '*" you have to be specified"
  origin: [
    'http://localhost:5173',
    'https://quaintprint-main.vercel.app/',
    'https://quaintprint-artist.vercel.app/',
    'https://quaintprint-admin.vercel.app/',
  ],
  credentials: true,
};

app.use(cors(corsOption));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

app.post('/base-image', async (req, res) => {
  // console.log(req.body);
  try {
    const l = await uriToClold(req.body?.imgSrc);
    console.log(l);
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
    });
  }
});

app.use('/api/v1/artists', artistRoute);
app.use('/api/v1/uploads', uploadRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/admin', adminRoute);

app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = app;
