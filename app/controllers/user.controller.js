const {
  getPaganitionService,
  createUserService,
  deleteUserService,
  getOneService,
  updateAccountService,
} = require("../services/user.service");

const getPaganition = (req, res) => {
  try {
    return getPaganitionService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const createUser = (req, res) => {
  try {
    // console.log(req.file.filename);
    return createUserService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteAccount = (req, res) => {
  try {
    return deleteUserService(req, res);
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

const updateAccount = (req, res) => {
  try {
    return updateAccountService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  getPaganition,
  createUser,
  deleteAccount,
  getOne,
  updateAccount,
};
