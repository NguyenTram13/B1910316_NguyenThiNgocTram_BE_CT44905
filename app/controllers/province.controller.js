const {
  getPaganitionService,
  createProvinceService,
  deleteProvinceService,
  getOneService,
  updateProvinceService,
  getAllProvinceService,
} = require("../services/province.service");

const getPaganition = (req, res) => {
  try {
    return getPaganitionService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const createProvince = (req, res) => {
  try {
    return createProvinceService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteProvince = (req, res) => {
  try {
    return deleteProvinceService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getOne = (req, res) => {
  try {
    return getOneService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const updateProvince = (req, res) => {
  try {
    return updateProvinceService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getAll = (req, res) => {
  try {
    return getAllProvinceService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  getPaganition,
  createProvince,
  deleteProvince,
  getOne,
  updateProvince,
  getAll,
};
