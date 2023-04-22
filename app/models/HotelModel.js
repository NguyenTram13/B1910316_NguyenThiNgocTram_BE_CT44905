const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: String,
    rating: Array,
    address: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
    },
    id_province: {
      type: String,
    },
    images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const HotelModel = mongoose.model("Hotel", HotelSchema);

module.exports = HotelModel;
