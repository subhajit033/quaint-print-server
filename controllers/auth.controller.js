const { promisify } = require('util');
const User = require('../models/user.model');
const APPError = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const signToken = (userId) => {
  return jwt.sign({ id: userId, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, //90d after jwt token will expire and user have to sign up agin if the signature
    //correct also
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  //remove password from output
  if (user.password) user.password = undefined;
  const cookieOptions = {
    //in expires is saved as date in config file so we have to convert it into a mili second
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('user_token', token, cookieOptions);
  res.status(statusCode).json({
    status: true,
    token,
    data: {
      data: user,
    },
  });
};
const userSignup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new APPError('user alrady exist with this email', 400));
    }
    const newUser = await User.create(req.body);

    //const url = `${req.protocol}://${req.get('host')}/me`;

    createAndSendToken(newUser, 201, res);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new APPError('please provide email and password', 400));
    }

    const user = await User.findOne({ email: email }).select('+password');
    //if user is null then user.password give error

    //security reason
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new APPError(`Incorrect email or password`, 401));
    }

    //console.log(user);
    createAndSendToken(user, 200, res);
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

module.exports = { userSignup, userLogin };
