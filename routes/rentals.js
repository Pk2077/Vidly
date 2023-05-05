const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const Fawn = require("fawn");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/Movie");
const { Customer } = require("../models/customer");
const Joi = require("joi");
const auth = require("../middleware/auth");

Fawn.init(Mongoose);

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-dateOut");
  if (!rental) return res.status(404).send("Not Found");
  res.send(rental);
});

router.post("/",auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid1");

  let movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid");

  if (movie.numberInStock === 0) return res.status(400).send("Not in Stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  new Fawn.Task()

    .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    .save("rentals", rental)
    .run();
  res.send(rental);

});

module.exports = router;
