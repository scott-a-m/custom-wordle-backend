require("dotenv").config();
require("express-async-errors");

const mongoose = require("mongoose");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSantize = require("express-mongo-sanitize");

const {
  getWordle,
  createWordle,
} = require("./controllers/worldeItemController");

const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://wordlemaker.scottsdev.net",
      "https://wordlemaker.netlify.app",
    ],
  })
);
app.use(xss());
app.use(helmet());
app.use(mongoSantize());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.get("/:id", getWordle);
app.get("/", (req, res) => {
  res.send("Custom Wordle Back-end");
});
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
