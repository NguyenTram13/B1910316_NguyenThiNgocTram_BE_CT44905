const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const ProvinceModel = mongoose.model("Province", ProvinceSchema);

module.exports = ProvinceModel;
