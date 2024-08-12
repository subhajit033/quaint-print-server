const User = require('../models/user.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');

const editUserDetails = async (req, res, next) => {
  try {
    const editedUser = await User.findByIdAndUpdate(req?.user?.id, req.body, {
      new: true,
    });
    successResponse(res, 200, editedUser);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};



module.exports = { editUserDetails };
