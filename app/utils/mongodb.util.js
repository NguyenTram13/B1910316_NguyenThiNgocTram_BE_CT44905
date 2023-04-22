const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:${process.env.PORT_MONGO}/${process.env.DB_NAME}`
    );
    console.log("success db");
  } catch (e) {
    console.log(e);
  }
}

module.exports = connectDatabase;
