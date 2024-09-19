const Room = require("../model/RoomModel");
const User = require("../model/UserModel");
exports.createRoom = async (req, res) => {
  const { id: host } = req.params;
  const { name } = req.body;
  try {
    const room = new Room({
      host,
      name,
    });
    await room.save();
  } catch (err) {
    res.status(500).json({ message: "not able to create room ", err });
  }
  const roomId = await Room.find({ name });
  res.status(200).json({
    message: "created room successfully",
    data: {
      roomName: name,
      roomId: roomId[0]._id,
    },
  });
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

exports.joinRoom = async (req, res) => {
  try {
    const { groupName, userid } = req.params;
    const room = await Room.findOne({ name: groupName });

    if (room) {
      room.guests.push(userid);
      await room.save();
      res.status(200).json({ message: "room joined" });
    }
  } catch (err) {
    res.status(500).json({ message: "not able to join room ", err });
  }
};
exports.getUserFromGroupName = async (req, res) => {
  try {
    const { groupName } = req.params;
    const result = await Room.findOne({ name: groupName }).exec(); // Use `findOne` to get a single document

    if (!result) {
      return res.status(404).json({ message: "Room not found" });
    }

    const guestListPromises = result.guests.map(async (guest) => {
      const user = await User.findById(guest).exec(); // Use `findById` to find user by ID
      return user ? user.username : null; // Handle case where user might not be found
    });

    const guestList = await Promise.all(guestListPromises);

    res.status(200).json({
      message: "Successfully fetched all the users",
      data: {
        guestList,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Error in fetching users" });
  }
};
