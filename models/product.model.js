const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    paintingThought: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    paintingSize: {
      type: String,
      required: true,
    },
    paintingType: {
      type: String,
      required: true,
    },
    price: [
      {
        price: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDenied: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: 'new',
    },
    artist: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Artist',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Product = model('Product', productSchema);

module.exports = Product;
