const express = require("express");
const userController = require("../controller/userController");
const roomController = require("../controller/roomController");
const router = express.Router();

router.post("/api/register", userController.userRegister);
router.post("/api/login", userController.userLogin);
router.post("/api/removeAllUser", userController.removeUsers);
router.post("/api/remove/:id", userController.remove);
router.get("/api/users", userController.getUsers);

router.post("/api/create/:id/:name", roomController.createRoom);
router.post("/api/removeAllRoom", roomController.removeAllRoom);
router.post("/api/remove/:id", roomController.remove);
router.get("/api/rooms", roomController.getRooms);
module.exports = router;
