const User = require('../models/user.model');
const successResponse = require('../utils/sucessResponse');
const APPError = require('../utils/ErrorHandler');
const { sendMail } = require('../utils/email');
const Email = require('../models/email.model');

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

const sendNewsLetterMail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await sendMail(
      email,
      'Welcome to quaintprint newsletter',
      'Thank you for being a part of quaintrint!'
    );
    const newSubs = await Email.create({ email });
    successResponse(res, 200, newSubs);
  } catch (e) {
    next(new APPError(e.message, 400));
  }
};

module.exports = { editUserDetails, sendNewsLetterMail };
