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

module.exports = { getMyOrders };
