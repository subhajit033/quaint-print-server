const { promisify } = require('util');
const APPError = require('../utils/ErrorHandler');
const User = require('../models/user.model');
const Artist = require('../models/artist.model');
const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');

const user_protect = async (req, res, next) => {
  /**
   * 1) Getting token and check of it's there
   * 2)verification of token
   * 3)chek if user still exists
   * 4)check if user changes password after token was issued
   *    */

  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      /*authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWNkMmVhYTE2MzYyMmQ3MTg5Y2MxYyIsImlhdCI6MTY5NjUyNDM3MSwiZXhwIjoxNzA0MzAwMzcxfQ.0Gq-COKiBO2BKvomDq0quMC22x8MpoRe6rBUt3ZV9YM',*/
      //the second one is token and we need the token only thats why we implemented split function
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.user_access_token) {
      token = req.cookies.user_access_token;
    }
    if (!token) {
      return next(
        new APPError('You are not logged in, please login to app first', 401)
      );
    }
    //promisifying  a function with the built in module of node js
    const verifyAsync = promisify(jwt.verify);
    //check if the payload is altered or not, decoded jwt will have have id of that particular user
    //which we are trying to access
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);

    /**
     * 3) if the user is still present or not
     */
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new APPError('User belonging to this token , no longer exists', 401)
      );
    }
    /**
     * 4) check if the user changed the password after the token issued
     * instances method always called on user
     */

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new APPError('User recently changed password', 401));
    }
    //passing the user property to next middleware
    req.user = currentUser;
  } catch (err) {
    return next(new APPError(err.message, 400));
  }
  //grant access to protected routes
  next();
};

const artist_protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      /*authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWNkMmVhYTE2MzYyMmQ3MTg5Y2MxYyIsImlhdCI6MTY5NjUyNDM3MSwiZXhwIjoxNzA0MzAwMzcxfQ.0Gq-COKiBO2BKvomDq0quMC22x8MpoRe6rBUt3ZV9YM',*/
      //the second one is token and we need the token only thats why we implemented split function
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.artist_access_token) {
      token = req.cookies.artist_access_token;
    }
    if (!token) {
      return next(
        new APPError('You are not logged in, please login to app first', 401)
      );
    }
    //promisifying  a function with the built in module of node js
    const verifyAsync = promisify(jwt.verify);
    //check if the payload is altered or not, decoded jwt will have have id of that particular user
    //which we are trying to access
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);

    /**
     * 3) if the user is still present or not
     */
    const currentUser = await Artist.findById(decoded.id);

    if (!currentUser) {
      return next(
        new APPError('User belonging to this token , no longer exists', 401)
      );
    }
    /**
     * 4) check if the user changed the password after the token issued
     * instances method always called on user
     */

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new APPError('User recently changed password', 401));
    }
    //passing the user property to next middleware
    req.artist = currentUser;
  } catch (err) {
    return next(new APPError(err.message, 400));
  }
  //grant access to protected routes
  next();
};
const admin_protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      /*authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWNkMmVhYTE2MzYyMmQ3MTg5Y2MxYyIsImlhdCI6MTY5NjUyNDM3MSwiZXhwIjoxNzA0MzAwMzcxfQ.0Gq-COKiBO2BKvomDq0quMC22x8MpoRe6rBUt3ZV9YM',*/
      //the second one is token and we need the token only thats why we implemented split function
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.admin_access_token) {
      token = req.cookies.admin_access_token;
    }
    if (!token) {
      return next(
        new APPError('You are not logged in, please login to app first', 401)
      );
    }
    //promisifying  a function with the built in module of node js
    const verifyAsync = promisify(jwt.verify);
    //check if the payload is altered or not, decoded jwt will have have id of that particular user
    //which we are trying to access
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);

    /**
     * 3) if the user is still present or not
     */
    const currentUser = await Admin.findById(decoded.id);

    if (!currentUser) {
      return next(
        new APPError('User belonging to this token , no longer exists', 401)
      );
    }
    /**
     * 4) check if the user changed the password after the token issued
     * instances method always called on user
     */

    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(new APPError('User recently changed password', 401));
    // }
    //passing the user property to next middleware
    req.admin = currentUser;
    req.role = 'admin';
  } catch (err) {
    return next(new APPError(err.message, 400));
  }
  //grant access to protected routes
  next();
};

const restrictToAdmins = (...roles) => {
  return (req, res, next) => {
    if (!req.role) {
      return res.status(403).json({
        status: false,
        message: `You don't have permission to access this route`,
      });
    }
    if (!roles.includes(req.role)) {
      return res.status(403).json({
        status: false,
        message: `You don't have permission to access this route`,
      });
    }
    next();
  };
};

module.exports = {
  user_protect,
  artist_protect,
  restrictToAdmins,
  admin_protect,
};
