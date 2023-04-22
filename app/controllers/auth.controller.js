const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    //get info client
    const { firstName, lastName, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      role: "client",
      avatar: "bear.png",
    });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi server");
  }
};
const login = async (req, res) => {
  try {
    //get info client
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid Email");
    }

    //check password for password
    const isPassvalid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPassvalid) {
      return res.status(400).send("Invalid Password");
    }
    const jwtToken = jwt.sign({ ...user._doc }, process.env.SECRET_JWT, {
      expiresIn: 3600,
    });
    return res.status(200).json({
      accessToken: jwtToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi server");
  }
};
module.exports = {
  register: register,
  login: login,
};
