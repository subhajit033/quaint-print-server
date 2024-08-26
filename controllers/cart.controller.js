const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');

const addTocart = async (req, res, next) => {
  const { productId } = req.params;
  req.body.product = productId;
  req.body.user = req.user.id;
  try {
    const newItem = await Cart.create(req.body);
    successResponse(res, 201, newItem);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const deleteFromCart = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedItem = await Cart.findByIdAndDelete(productId);
    successResponse(res, 203, deletedItem);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const getCartItem = async (req, res, next) => {
  try {
    const cartItem = await Cart.find({ user: req?.user?.id }).populate({
      path: 'product',
      select: ['title', '_id', 'price', 'picture'],
    });
    successResponse(res, 200, cartItem);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const updateCart = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cartItem = await Cart.findByIdAndUpdate(cartId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    next(new APPError(error.message, 400));
  }
};

module.exports = { addTocart, deleteFromCart, getCartItem, updateCart };
