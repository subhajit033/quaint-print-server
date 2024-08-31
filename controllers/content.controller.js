const Banner = require('../models/banner.model');
const BestDeal = require('../models/bestDeals.model');
const BestSeller = require('../models/bestSeller.model');
const APPError = require('../utils/ErrorHandler');
const successResponse = require('../utils/sucessResponse');
const sucessResponse = require('../utils/sucessResponse');

const uploadBanner = async (req, res, next) => {
  try {
    const banner = await Banner.create(req.body);
    sucessResponse(res, 200, banner);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const uploadBestDeal = async (req, res, next) => {
  try {
    const bestDeal = await BestDeal.create(req.body);
    sucessResponse(res, 200, bestDeal);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const uploadBestSeller = async (req, res, next) => {
  try {
    const bestSeller = await BestSeller.create(req.body);
    sucessResponse(res, 200, bestSeller);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const getBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find();
    sucessResponse(res, 200, banner);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const getBestDeal = async (req, res, next) => {
  try {
    const bestDeal = await BestDeal.find();
    sucessResponse(res, 200, bestDeal);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const getBestSeller = async (req, res, next) => {
  try {
    const bestSeller = await BestSeller.find();
    sucessResponse(res, 200, bestSeller);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

const deleteBanner = async (req, res, next) => {
  const { pdtId } = req.params;
  try {
    const pdt = await Banner.findByIdAndDelete(pdtId);
    successResponse(res, 203, null);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const deleteBestDelas = async (req, res, next) => {
  const { pdtId } = req.params;
  try {
    const pdt = await BestDeal.findByIdAndDelete(pdtId);
    successResponse(res, 203, null);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};
const deleteBestSeller = async (req, res, next) => {
  const { pdtId } = req.params;
  try {
    const pdt = await BestSeller.findByIdAndDelete(pdtId);
    successResponse(res, 203, null);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

module.exports = {
  uploadBanner,
  uploadBestDeal,
  uploadBestSeller,
  getBanner,
  getBestDeal,
  getBestSeller,
  deleteBanner,
  deleteBestDelas,
  deleteBestSeller,
};
