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

const getCartItem = async (req, res, next)=>{
    try {
        const cartItem = await User.findById(req?.user?.id).populate('mycart')
        successResponse(res, 200, cartItem);
    } catch (e) {
        next(new APPError(e.message, 400))
        
    }
}

module.exports = {addTocart, deleteFromCart, getCartItem}