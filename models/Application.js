const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: String,
  link: String,
  image: String,
  description: String
});

const applicationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  location: String,
  role: String,
  category: String,
  hourlyRate: String,
  experience: String,
  description: String,
  skills: String,
  photoSquare: String,
  photoPortrait: String,
  portfolios: [portfolioSchema],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);
