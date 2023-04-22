const express = require("express");
const {
  getPaganition,
  createProvince,
  deleteProvince,
  getOne,
  updateProvince,
  getAll,
} = require("../controllers/province.controller");

const { isAdmin, isAuthentication } = require("../middleware/AuthMiddleware");
const { upload } = require("../utils/uploads");

const router = express.Router();
router.get("/pagination", [isAuthentication, isAdmin], getPaganition);
router.post("/create", [isAuthentication, isAdmin], createProvince);
router.get("/detail/:id", [isAuthentication], getOne);
router.get("/getAll", [isAuthentication], getAll);

router.delete("/:id", [isAuthentication, isAdmin], deleteProvince);
router.patch("/update/:id", [isAuthentication, isAdmin], updateProvince);

module.exports = router;
