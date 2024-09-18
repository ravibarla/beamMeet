const { default: mongoose, models, model } = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: String,
  host: String,
});

const Room = models.Room || model("Room", RoomSchema);

module.exports = Room;
