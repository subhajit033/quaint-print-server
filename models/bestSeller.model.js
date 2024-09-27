const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: [
    {
      price: {
        type: String,
        required: true,
      },
      marketPrice: {
        type: String,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  aboutItem: [{ type: String }],
  itemWeight: {
    type: String,
  },
  material: {
    type: String,
  },
  texture: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const BestSeller = model('BestSeller', schema);

module.exports = BestSeller;
