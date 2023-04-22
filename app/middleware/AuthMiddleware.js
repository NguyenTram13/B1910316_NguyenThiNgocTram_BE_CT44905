const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const isAuthentication = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const access_token = bearerHeader.split(" ")[1];
    const decodeJwt = jwt.verify(access_token, process.env.SECRET_JWT);
    req.userId = decodeJwt._id; //gán id cho req sau
    next();
  } catch (e) {
    console.log(e);
    if (e instanceof jwt.TokenExpiredError) {
      console.log("token het han");
      return res.status(401).send("Token expired");
    }

    return res.status(401).send("Authentication not valid");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findOne({ _id: userId });
    if (user?.role == "admin") {
      console.log("check admin");
      next();
    } else {
      console.log("token khong phai admin");

      return res.status(403).send("Authentication not admin");
    }
  } catch (e) {
    console.log("loi check admin", e);
    return res.status(401).send("Authentication not valid");
  }
};

module.exports = {
  isAuthentication: isAuthentication,
  isAdmin: isAdmin,
};
