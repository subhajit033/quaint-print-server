const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


const Cart = model('Cart', cartSchema);

module.exports = Cart;
