const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  genre: {
    type:String,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = { genre: Joi.string().min(5).max(50).required() };
  return Joi.validate(genre, schema);
}
exports.validate = validateGenre;
exports.Genre = Genre;
exports.genreSchema=genreSchema;