const { Schema, model } = require('mongoose');

const schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  contactNo: String,
  message: String,
});

const Enquiry = model('Enquiry', schema);
module.exports = Enquiry;
