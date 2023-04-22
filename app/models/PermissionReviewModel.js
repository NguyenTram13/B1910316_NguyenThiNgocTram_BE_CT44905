const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema(
  {
    id_user: Number,
  },
  {
    id_hotel: Number,
  },
  {
    status: Number,
  },
  {
    timestamps: true,
  }
);

const ProvinceModel = mongoose.model("Province", ProvinceSchema);

module.exports = ProvinceModel;
