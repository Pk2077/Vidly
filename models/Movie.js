const mongoose = require("mongoose");
const {genreSchema} = require("../models/genre");
const Joi= require("joi");

const movieSchema =new mongoose.Schema({
    title:{
        type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:50
    },
    genre:{
        type:genreSchema
    },
    numberInStock:Number,
    dailyRentalRate:Number
    
    
    });
const Movie = mongoose.model("Movies",movieSchema );

function validate(movie) {
    const schema = {
       title: Joi.string().min(3).max(50).required(),
       genreId:Joi.objectId(),
       numberInStock: Joi.number().max(50).required(),
        dailyRentalRate: Joi.number().required()
    };
    return Joi.validate(movie, schema);
}
module.exports.movieSchema= movieSchema;
exports.validate=validate;
module.exports.Movie = Movie;