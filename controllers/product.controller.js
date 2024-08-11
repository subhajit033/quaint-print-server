const Product = require('../models/product.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');

const uploadArt = async (req, res, next) => {
  req.body.artist = req?.artist?.id;
  try {
    const newArt = await Product.create(req.body);
    successResponse(res, 201, newArt);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const updateArt = async (req, res, next) => {
  const { artId } = req.params;
  try {
    const updatedArt = await Product.findByIdAndUpdate(artId, req.body, {
      new: true,
    });
    successResponse(res, 200, updatedArt);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = Product.find({ isApproved: { $ne: false } });

    successResponse(res, 200, products, { length: products.length });
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

module.exports = { uploadArt, getAllProduct, updateArt };
