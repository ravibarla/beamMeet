const Room = require("../model/RoomModel");
const User = require("../model/UserModel");
exports.createRoom = async (req, res) => {
  const { name, id: host } = req.params;
  // const hostname = await User.findById({ _id: id }).username;
  // console.log("hostname :", hostName);
  try {
    const room = new Room({
      name,
      host,
    });
    await room.save();
  } catch (err) {
    res.status(500).json({ message: "not able to create room ", err });
  }
  res.status(500).json({ message: "created room successfully" });
};
exports.removeAllRoom = async (req, res) => {
  try {
    await Room.deleteMany();
  } catch (err) {
    res.status(500).json({ message: "not able to delete room ", err });
  }
  res.status(500).json({ message: " room deleted successfully" });
};

exports.remove = async (req, res) => {
  const { id: roomId } = req.params;
  try {
    await Room.findByIdAndDelete({ _id: roomId });
  } catch (err) {
    res.status(500).json({ message: "not able to delete room ", err });
  }
  res.status(500).json({ message: " room deleted successfully" });
};

exports.getRooms = async (req, res) => {
  try {
    const room = await Room.find({});
    res.status(200).json({ room });
  } catch (err) {
    res.status(500).json({ message: "not able to get room ", err });
  }
};
