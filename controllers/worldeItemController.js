const Wordle = require("../models/wordleItemModel");

const getWordle = async (req, res) => {
  const wordleItem = await Wordle.findOne({ _id: req.params.id });
  if (!wordleItem) throw new Error("No Item Exists with this ID");
  res.status(200).json(wordleItem);
};

const createWordle = async (req, res) => {
  const { word } = req.body;
  const wordleItem = await Wordle.create({ word });
  res.status(200).json({ msg: "Wordle Created", wordleItem });
};

module.exports = { getWordle, createWordle };
