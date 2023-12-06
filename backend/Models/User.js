const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type:String, unique: false},
  password: String,
  browser : {type:String, default: null},
  OS: {type:String, default: null},
  deviceType: {type:String, default: null},
}, {timestamps: true});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;