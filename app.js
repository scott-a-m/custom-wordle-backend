require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");
const {
  getWordle,
  createWordle,
} = require("./controllers/worldeItemController");

const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

app.get("/:id", getWordle);
app.post("/", createWordle);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB");
    app.listen(port, () => {
      console.log("listening on port:", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
