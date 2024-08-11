const Artist = require('../models/artist.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');
const bcrypt = require('bcryptjs')
const {createAndSendToken} = require('../shared/auth.shared')

const artistSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const artistExist = await Artist.findOne({ email });
    if (artistExist) {
      return next(new APPError('Artist alrady exist with this email', 400));
    }
    const artist = await Artist.create(req?.body);
    successResponse(res, 201, artist);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const artistLogin = async () => {
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
    createAndSendToken(user, 200, res, 'artist_access_token', 'artist' );
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

module.exports = { artistSignUp, artistLogin };
