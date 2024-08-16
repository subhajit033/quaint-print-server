const Artist = require('../models/artist.model');
const successResponse = require('../utils/sucessResponse');
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const APPError = require('../utils/ErrorHandler');
const bcrypt = require('bcryptjs');
const { createAndSendToken } = require('../shared/auth.shared');
require('dotenv').config();

const artistSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const artistExist = await Artist.findOne({ email });
    if (artistExist) {
      return next(new APPError('Artist alrady exist with this email', 400));
    }
    const artist = await Artist.create(req?.body);
    createAndSendToken(artist, 200, res, 'artist_access_token', 'artist');
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const artistLogin = async (req, res, next) => {
  console.log('artist llogin runs');
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new APPError('please provide email and password', 400));
    }

    const user = await Artist.findOne({ email: email }).select('+password');
    //if user is null then user.password give error

    //security reason
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new APPError(`Incorrect email or password`, 401));
    }

    //console.log(user);
    createAndSendToken(user, 200, res, 'artist_access_token', 'artist');
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

const getMyArts = async (req, res, next) => {
  try {
    const myArts = await Artist.findById(req?.artist?.id).populate('myArt');

    successResponse(res, 200, myArts);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const editArtistDetails = async (req, res, next) => {
  req.body.bankDetails.isBankDetailsEdited = true;
  try {
    const editedArtist = await Artist.findByIdAndUpdate(
      req?.artist?.id,
      req.body,
      {
        new: true,
      }
    );
    successResponse(res, 200, editedArtist);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const isArtistLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.artist_access_token) {
      const verifyAsync = promisify(jwt.verify);

      const decoded = await verifyAsync(req.cookies.artist_access_token, process.env.JWT_SECRET);
      const currentUser = await Artist.findById(decoded.id);
      if (!currentUser) {
        return next(new APPError('No one user found with this Id', 404));
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new APPError('Please log in to the app', 403));
      }

      //There is a logged in users
      res.status(200).json({
        status: 'success',
        data: {
          user: currentUser
        }
      });
    } else {
      throw new Error('No cookie found');
    }
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};


module.exports = { artistSignUp, artistLogin, getMyArts, editArtistDetails, isArtistLoggedIn };
