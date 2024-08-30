const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const BestSeller = model('BestSeller', schema);

module.exports = BestSeller;
