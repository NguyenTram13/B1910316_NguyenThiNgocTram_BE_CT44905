const express = require("express");
const {
  getPaganition,
  createHotel,
  deleteHotel,
  getOne,
  updateHotel,
  getHotelSame,
  create_rating,
} = require("../controllers/hotel.controller");

const { isAdmin, isAuthentication } = require("../middleware/AuthMiddleware");
const { upload } = require("../utils/uploads");

const router = express.Router();
router.get("/pagination", [isAuthentication], getPaganition);
router.get("/getHotelSame/:id/:id_doc", [isAuthentication], getHotelSame);

router.post(
  "/create",
  upload.array("images", 10),
  [isAuthentication, isAdmin],
  createHotel
);
router.post("/create_rating/:id", [isAuthentication], create_rating);
router.get("/detail/:id", [isAuthentication], getOne);

router.delete("/:id", [isAuthentication, isAdmin], deleteHotel);
router.patch(
  "/update/:id",
  upload.array("images", 10),
  [isAuthentication, isAdmin],
  updateHotel
);

module.exports = router;
