const { models, model, mongoose } = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: String,
  host: String,
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Optional: Reference to a User model,
});

const Room = models.Room || model("Room", RoomSchema);

module.exports = Room;
