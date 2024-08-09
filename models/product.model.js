const { Schema, model } = require('mongoose');

const productSchema = new Schema({
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
  price: {
    type: String,
    required: true,
    default: '999',
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  artist:{
    type:  Schema.Types.ObjectId,
    required: true,
    ref: 'Artist'
  }
});

const Product = model('Product', productSchema);

module.exports = Product;
