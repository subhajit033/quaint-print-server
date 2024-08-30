const { Schema, model } = require('mongoose');

const bannerSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  bannerType: {
    type: String,
    default: 'home',
  },
});

const Banner = model('Banner', bannerSchema);

module.exports = Banner;
