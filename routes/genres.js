const express = require("express");
const router = express.Router();
const {Genre, validate} = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");


router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("genre");
  if (!genres) return res.status(404).send("Not Found");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    genre: req.body.genre,
  });
  await genre.save();
  res.send(genre);
});

router.put("/:id",[auth,validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { genre: req.body.genre },
    { new: true }
  );
  if (!genre) return res.status(404).send("Not Found");

  res.send(genre);
});

router.delete("/:id",[auth,validateObjectId,admin], async (req, res) => {
  let genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Not Found");
  res.send(genre);
});
router.get("/:id",validateObjectId, async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Not Found");
  res.send(genre);
});



module.exports = router;
