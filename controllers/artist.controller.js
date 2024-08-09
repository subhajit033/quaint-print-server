const Artist = require('../models/artist.model');
const successResponse = require('../utils/sucessResponse');
const ErrorHandler = require('../utils/ErrorHandler');
const addArtist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const artistExist = await Artist.findOne({ email });
    if (artistExist) {
      return next(new ErrorHandler('Artist alrady exist with this email', 400));
    }
    const artist = await Artist.create(req?.body);
    successResponse(res, 201, artist);
  } catch (e) {
    next(new ErrorHandler(e.message, 400));
  }
};

module.exports = { addArtist };
