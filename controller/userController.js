const User = require("../model/UserModel");
exports.userRegister = async (req, res) => {
  const { username, password, mobile } = req.body;
  const user = new User();
  try {
    if (username.length == 0) {
      res.status(500).json({ message: "username cannot be empty" });
    } else if (password.length == 0) {
      res.status(500).json({ message: "username cannot be empty" });
    } else if (mobile.length == 0) {
      res.status(500).json({ message: "username cannot be empty" });
    }
    const user = new User({ username, password, mobile });
    await user.save();
  } catch (err) {
    res.status(500).json({ message: "Error inregistering user", error });
  }
  res.status(200).json({ message: "user registered successfully" });
};

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.find({ username });
    const dbPassword = user[0].password;
    if (password === dbPassword) {
      return res.status(200).json({ message: "logged in successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "logged in unsuccessfully", err });
  }
};
exports.removeUsers = async (req, res) => {
  try {
    await User.deleteMany({});
  } catch (err) {
    res.status(500).json({ message: "Error inregistering user", err });
  }
  res.status(200).json({ message: " all the users removed successfully" });
};

exports.remove = async (req, res) => {
  const { id: userId } = req.params;
  try {
    await User.findByIdAndDelete({ _id: userId });
  } catch (err) {
    res.status(500).json({ message: "Error inregistering user", err });
  }
  res.status(200).json({ message: "the users removed successfully" });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error inregistering user", err });
  }
};
