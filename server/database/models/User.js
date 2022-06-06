const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 5,
    validate: (value)=>validator.isEmail(value)
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;