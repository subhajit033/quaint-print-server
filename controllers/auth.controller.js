const User = require('../models/user.model');
const APPError = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createAndSendToken } = require('../shared/auth.shared');
const crypto = require('crypto');

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
    createAndSendToken(user, 200, res, "user_access_token", 'user');
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

module.exports = { userSignup, userLogin };
