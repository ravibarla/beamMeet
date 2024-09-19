const express = require("express");
const userController = require("../controller/userController");
const roomController = require("../controller/roomController");
const generateChatroomName = require("./helper");

const router = express.Router();

router.post("/api/register", userController.userRegister);
router.post("/api/login", userController.userLogin);
router.post("/api/removeAllUser", userController.removeUsers);
router.post("/api/remove/:id", userController.remove);
router.get("/api/users", userController.getUsers);

router.post(
  "/api/create/:id",
  (req, res, next) => {
    req.body.name = generateChatroomName();
    next();
  },
  roomController.createRoom
);
router.post("/api/removeAllRoom", roomController.removeAllRoom);
router.post("/api/remove/:id", roomController.remove);
router.get("/api/rooms", roomController.getRooms);
router.post("/api/:userid/join/:groupName", roomController.joinRoom);
router.get("/api/room/:groupName",roomController.getUserFromGroupName);
module.exports = router;
