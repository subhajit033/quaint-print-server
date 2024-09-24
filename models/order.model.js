const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Cart',
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
    status: {
      type: String,
      default: 'In process',
    },
    orderId: {
      type: String,
    },
    paymentMode: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Order = model('Order', orderSchema);
module.exports = Order;
