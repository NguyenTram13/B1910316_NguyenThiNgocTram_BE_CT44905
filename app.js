const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const authRoute = require("./app/routes/auth.route");
const userRoute = require("./app/routes/user.route");
const provinceRoute = require("./app/routes/province.route");
const hotelRoute = require("./app/routes/hotel.route");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "/app/uploads")));

app.use("/api/auth", authRoute);
app.use("/api/auth/user", userRoute);
app.use("/api/auth/province", provinceRoute);
app.use("/api/auth/hotel", hotelRoute);

app.use((req, res, next) => {
  // Code ở đây sẽ chạy khi không có route được định nghĩa nào
  // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
  // Middleware xử lý lỗi tập trung.
  // Trong các đoạn code xử lý ở các route, gọi next(error)
  // sẽ chuyển về middleware xử lý lỗi này
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
