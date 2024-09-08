const APPError = require('../utils/ErrorHandler');
const successResponse = require('../utils/sucessResponse');
const Cart = require('../models/cart.model');
const Order = require('../models/cart.model');
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

const createOrder = async (req, res, next) => {
  let totalValue = 0;
  const { cartIds } = req.body;
  for (let i = 0; i < cartIds.length; i++) {
    const cartItem = await Cart.findById(cartIds[i]);
    totalValue = totalValue + cartItem.price * cartItem.quantity;
  }

  const options = {
    amount: totalValue * 100,
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const data = await razorpay.orders.create(options);
    res.status(200).json({ data });
  } catch (e) {
    next(new APPError('Order creation failed', 400));
  }
};

const verifyOrder = async (req, res, next) => {
  console.log(req.body);
};

module.exports = { createOrder, verifyOrder };
