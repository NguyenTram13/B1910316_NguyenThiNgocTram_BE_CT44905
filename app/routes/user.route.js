const express = require("express");
const {
  getPaganition,
  createUser,
  deleteAccount,
  getOne,
  updateAccount,
} = require("../controllers/user.controller");
const { isAdmin, isAuthentication } = require("../middleware/AuthMiddleware");
const { upload } = require("../utils/uploads");

const router = express.Router();
router.get("/pagination", [isAuthentication, isAdmin], getPaganition);
router.post(
  "/create",
  upload.single("avatar"),
  [isAuthentication, isAdmin],
  createUser
);
router.get("/detail/:id", [isAuthentication, isAdmin], getOne);

router.delete("/:id", [isAuthentication, isAdmin], deleteAccount);
router.patch(
  "/update/:id",
  upload.single("avatar"),
  [isAuthentication, isAdmin],
  updateAccount
);

module.exports = router;
