let per_page = 3;
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const getPaganitionService = async (req, res) => {
  try {
    // return res.status(200).json("get success");
    let offset = (req.query.page - 1) * per_page;
    console.log(req.query.keyword);
    let keyword = req.query.keyword;
    const accounts = await UserModel.find({})
      .skip(offset)
      .limit(per_page)
      .sort({ createdAt: "desc" });
    let totalPage = await UserModel.count();

    return res.status(200).json({
      accounts: accounts,
      totalPage: Math.ceil(totalPage / per_page),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
const createUserService = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      role: req.body.role,
      tel: req.body.tel,
      address: req.body.address,
      avatar: req.file.filename || "bear.png",
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const deleteUserService = async (req, res) => {
  try {
    const account = await UserModel.findOne({ _id: req.params.id });
    if (!account) return res.status(200).json("delete success");
    await account.remove();
    return res.status(200).json("delete success");
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

const getOneService = async (req, res) => {
  try {
    const account = await UserModel.findOne({ _id: req.params.id });
    if (!account) return res.status(404).json("ACCOUNT NOT FOUND");
    return res.status(200).json(account);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const updateAccountService = async (req, res) => {
  try {
    const account = await UserModel.findOne({ _id: req.params.id });
    if (!account) return res.status(500).json("Tài khoản không tồn tại!");
    if (req.file?.filename) {
      req.body.avatar = req.file.filename;
    }
    if (req.body.password) {
      console.log("pass", req.body.password);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    } else {
      delete req.body.password;
    }
    const status = await UserModel.findOneAndUpdate(
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
module.exports = {
  getPaganitionService,
  createUserService,
  deleteUserService,
  getOneService,
  updateAccountService,
};
