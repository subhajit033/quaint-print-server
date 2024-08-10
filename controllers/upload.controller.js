const {uploadOnclould} = require('../utils/cloudinary');
const APPError = require('../utils/ErrorHandler');

const uploadToClould = async (req, res, next) => {
  try {
    const postUrl = await uploadOnclould(req.filename, false);
    if (!postUrl) return next(new APPError('Please provide file name', 404));

    res.status(200).json({
      url: postUrl,
    });
  } catch (err) {
    return next(new APPError(err.message, 400));
  }
};

module.exports = { uploadToClould };
