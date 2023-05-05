const express = require("express");
const router = express.Router();
const {Movie, validate} = require("../models/Movie");
const Joi = require("joi");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");

router.get("/", async (req, res)=>{
    const movie = await Movie.find().sort("name");
    if (!movie) return res.status(404).send("Not Found");
    res.send(movie);
    });
    
    router.get("/:id", async (req, res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("Not Found");
    res.send(movie);
    });
    
    router.post("/",auth, async (req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre)return res.status(400).send("Invalid");

    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            genre:genre.genre
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
    });
    
    router.put("/:id", auth, async (req, res)=>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let movie = await Movie.findByIdAndUpdate(req.params.id,
        { title:req.body.title,
            numberInStock:req.body.numberInStock,
            genre:{
                _id:genre._id,
                genre:genre.genre
            },
            dailyRentalRate:req.body.dailyRentalRate},
        {new:true}
    );
    if(!movie) return res.status(404).send("Not Found");
    res.send(movie);
    });
    
    router.delete("/:id",auth, async (req, res)=>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send("Not Found");
    
    res.send(movie);
    });


    module.exports = router;