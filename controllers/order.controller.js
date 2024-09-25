const Order = require('../models/order.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('product');
    successResponse(res, 200, orders);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const getAllorders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate(['user', 'product']);
    successResponse(res, 200, orders);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const approveOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    successResponse(res, 200, order);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

module.exports = { getMyOrders, getAllorders, approveOrder };
