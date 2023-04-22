const app = require("./app");
const config = require("./app/config");
const connectDatabase = require("./app/utils/mongodb.util");
require("dotenv").config();

async function startServer() {
  try {
    connectDatabase();
    console.log("Connected to the database!");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}

startServer();
