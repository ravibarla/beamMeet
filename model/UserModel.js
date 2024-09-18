const { default: mongoose, models, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  mobile: Number,
});

const User = models.User || model("User", UserSchema);

module.exports = User;
