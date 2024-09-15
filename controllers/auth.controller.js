const User = require('../models/user.model');
const APPError = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createAndSendToken } = require('../shared/auth.shared');
const crypto = require('crypto');
const { promisify } = require('util');
require('dotenv').config();

const userSignup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new APPError('user alrady exist with this email', 400));
    }
    const newUser = await User.create(req.body);

    //const url = `${req.protocol}://${req.get('host')}/me`;

    createAndSendToken(newUser, 201, res, 'user_access_token', 'user');
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
    createAndSendToken(user, 200, res, 'user_access_token', 'user');
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

const isUserLoggedin = async (req, res, next) => {
  try {
    if (req.cookies.user_access_token) {
      const verifyAsync = promisify(jwt.verify);

      const decoded = await verifyAsync(
        req.cookies.user_access_token,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
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
          user: currentUser,
        },
      });
    } else {
      throw new Error('No cookie found');
    }
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

const userSignInWithGoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      createAndSendToken(user, 200, res, 'user_access_token', 'user');
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      req.body.password = generatedPassword;
      const newUser = await User.create(req.body);
      createAndSendToken(newUser, 201, res, 'user_access_token', 'user');
    }
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

const logoutUser = async (req, res, next) => {
  res.cookie('user_access_token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: true,
  });
};

module.exports = {
  userSignup,
  userLogin,
  isUserLoggedin,
  userSignInWithGoogle,
  logoutUser,
};
