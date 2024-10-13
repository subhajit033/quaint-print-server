const { model, Schema } = require('mongoose');
const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const Email = model('Email', schema);

module.exports = Email;
