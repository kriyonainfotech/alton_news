const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 8000;
connectDB();
dotenv.config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); // Change `true` or `false` as needed
app.use(bodyParser.json());

const cors = require("cors");
const corsOptions = {
  origin: ["http://127.0.0.1:5500"],
  methods: ["GET", "POST", "PUT", "DELETE"], // Add methods as needed
  credentials: true, // If your frontend sends cookies
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/", require("./routes/indexRoutes"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is running on port ${port}`);
});
