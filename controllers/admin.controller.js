const Admin = require('../models/admin.model');
const Product = require('../models/product.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');
const bcrypt = require('bcryptjs');
const { createAndSendToken } = require('../shared/auth.shared');

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new APPError('please provide email and password', 400));
    }

    const admin = await Admin.findOne({ email: email }).select('+password');
    //if user is null then user.password give error

    //security reason
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return next(new APPError(`Incorrect email or password`, 401));
    }

    createAndSendToken(admin, 200, res, 'admin_access_token', 'admin');
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

const approveProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { price } = req.body;
  if (!price || price === 0) {
    return next(new APPError('Please set price for this product', 400));
  }
  try {
    const approvedPdt = await Product.findByIdAndUpdate(productId, {...req.body, isApproved: true}, {
      new: true,
    });
    successResponse(res, 200, approvedPdt);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

module.exports = { adminLogin, approveProduct };
