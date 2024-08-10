const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const ErrorHandler = require('../utils/ErrorHandler');

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, 'Email is mandatory'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'password is mandatory'],
      select: false,
    },
    firstName: {
      type: String,
      required: [true, 'first name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
    },
    avatar: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    altContactNo: {
      type: String,
    },
    address: {
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    bankDetails: {
      accountNo: {
        type: String,
      },
      ifscCode: {
        type: String,
      },
      accountHolderName: {
        type: String,
      },
      checkBook: {
        type: String,
      },
      upiId: {
        type: String,
      },

      isBankDetailsEdited: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

artistSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  //false means password not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //10 miniutes for password reset
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = model('User', userSchema);

module.exports = User;
