const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  specialty: String,
  star: String,
  imgUrl: String,
  city: String,
  reviews: [String]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
