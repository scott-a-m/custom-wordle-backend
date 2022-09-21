const mongoose = require("mongoose");

const WorldeItemSchema = mongoose.Schema(
  {
    word: {
      type: String,
      reqired: true,
      minLength: 5,
      maxLength: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WORDLE", WorldeItemSchema);
