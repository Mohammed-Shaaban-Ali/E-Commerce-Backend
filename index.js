const express = require("express");
const app = express();
const dbConnection = require("./config/DBConnect");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { notfound, errorHandler } = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
const compression = require("compression");

// mongo server
dbConnection();
app.use(cors());
app.use(compression());
// parse application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/user", require("./routes/authRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/blog", require("./routes/blogRoute"));
app.use("/api/product-category", require("./routes/productCategoryRoute"));
app.use("/api/blog-category", require("./routes/blogCategoryRoute"));
app.use("/api/brand-category", require("./routes/brandCategoryRoute"));
app.use("/api/coupon", require("./routes/couponRoute"));
app.use("/api/color", require("./routes/colorRoute"));
app.use("/api/enquiry", require("./routes/enquiryRoute"));
app.use("/api/upload", require("./routes/uploadRoute"));

// middleware
app.use(notfound);
app.use(errorHandler);

// server running
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
