const Admin = require('../models/admin.model');
const Product = require('../models/product.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');
const bcrypt = require('bcryptjs');
const { createAndSendToken } = require('../shared/auth.shared');
const { sendMail } = require('../utils/email');
const Enquiry = require('../models/enquiry.model');
const { sendHTMLMail } = require('../utils/email');
const { denyProductHtml } = require('../utils/const');

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
    const approvedPdt = await Product.findByIdAndUpdate(
      productId,
      { ...req.body, isApproved: true },
      {
        new: true,
      }
    ).populate('artist');

    if (!approvedPdt) {
      return next(new APPError('No product found', 404));
    }
    await sendMail(
      approvedPdt?.artist?.email,
      `Approval of your art ${approvedPdt?.title}`,
      'Your Product is approved by admin'
    );
    successResponse(res, 200, approvedPdt);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const getUnapprovedpdt = async (req, res, next) => {
  try {
    const products = await Product.find({
      isApproved: false,
      isDenied: false,
    }).populate('artist');
    successResponse(res, 200, products);
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

const isAdminLoggedin = async (req, res, next) => {
  try {
    if (req.cookies.admin_access_token) {
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

const logoutAdmin = async (req, res, next) => {
  res.cookie('admin_access_token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: true,
  });
};

const addEnquiry = async (req, res, next) => {
  try {
    const enq = await Enquiry.create(req.body);
    successResponse(res, 201, enq);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const getEnquiry = async (req, res, next) => {
  try {
    const enq = await Enquiry.find();
    successResponse(res, 200, enq);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const denyProduct = async (req, res, next) => {
  const pdtId = req.params.productId;
  const { email, message } = req.body;
  try {
    const pdt = await Product.findByIdAndUpdate(
      pdtId,
      { isDenied: true },
      {
        new: true,
      }
    );
    if (!pdt) {
      return next(new APPError('No product found', 404));
    }
    await sendHTMLMail(email, 'Product Denied', denyProductHtml(message));
    res.status(200).json({
      status: true,
    });
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
module.exports = {
  adminLogin,
  approveProduct,
  getUnapprovedpdt,
  logoutAdmin,
  addEnquiry,
  getEnquiry,
  denyProduct,
};
