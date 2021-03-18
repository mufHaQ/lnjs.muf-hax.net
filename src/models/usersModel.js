const mongoose = require('mongoose')
const {
  Schema
} = mongoose

const userSchema = new Schema({
  email: String, // String is shorthand for {type: String}
  username: String,
  password: String
}, {timestamps: true})

const User = mongoose.model('users', userSchema)

module.exports = User