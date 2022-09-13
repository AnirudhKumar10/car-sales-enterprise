const express = require("express");
const mongoose = require("mongoose");
const salesRoutes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());

global.__basedir = __dirname;

mongoose
  .connect(
    "mongodb+srv://admin:test123@cluster0.oalb1.mongodb.net/carSales?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDb");
  });

app.use(express.json());

app.use("/sale", salesRoutes);

app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(4000, () => {
  console.log("Server started on port: 4000");
});
