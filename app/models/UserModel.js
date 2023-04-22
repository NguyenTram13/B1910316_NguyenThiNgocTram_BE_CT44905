const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    tel: {
      type: String,
    },
    avatar: {
      type: String,
    },
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
