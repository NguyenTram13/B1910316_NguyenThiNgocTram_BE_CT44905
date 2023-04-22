let per_page = 3;
const bcrypt = require("bcrypt");
const ProvinceModel = require("../models/ProvinceModel");

const getPaganitionService = async (req, res) => {
  try {
    // return res.status(200).json("get success");
    let offset = (req.query.page - 1) * per_page;
    console.log(req.query.keyword);
    let keyword = req.query.keyword;
    const provinces = await ProvinceModel.find({})
      .skip(offset)
      .limit(per_page)
      .sort({ createdAt: "desc" });
    let totalPage = await ProvinceModel.count();

    return res.status(200).json({
      provinces: provinces,
      totalPage: Math.ceil(totalPage / per_page),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
const createProvinceService = async (req, res) => {
  try {
    console.log(req.body);
    const newProvince = new ProvinceModel({
      name: req.body.name,
    });
    await newProvince.save();
    return res.status(201).json(newProvince);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const deleteProvinceService = async (req, res) => {
  try {
    const province = await ProvinceModel.findOne({ _id: req.params.id });
    if (!province) return res.status(200).json("delete success");
    await province.remove();
    return res.status(200).json("delete success");
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

const getOneService = async (req, res) => {
  try {
    const PROVINCE = await ProvinceModel.findOne({ _id: req.params.id });
    if (!PROVINCE) return res.status(404).json("PROVINCE NOT FOUND");
    return res.status(200).json(PROVINCE);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const updateProvinceService = async (req, res) => {
  try {
    const province = await ProvinceModel.findOne({ _id: req.params.id });
    if (!province) return res.status(500).json("Tinh thành không tồn tại!");
    console.log(req.body);
    const status = await ProvinceModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(201).json(status);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getAllProvinceService = async (req, res) => {
  try {
    const provinces = await ProvinceModel.find({});
    return res.status(200).json(provinces);
  } catch (e) {
    return res.status(500).json(e);
  }
};
module.exports = {
  getPaganitionService,
  createProvinceService,
  deleteProvinceService,
  getOneService,
  updateProvinceService,
  getAllProvinceService,
};
