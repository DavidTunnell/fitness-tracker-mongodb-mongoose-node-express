const router = require("express").Router();
const { Workout } = require("../models");

//api routes go here
router.get("/workouts", (req, res) => {
    console.log(Workout);
    Workout.find({})
        .then((dbTransaction) => {
            res.json(dbTransaction);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;
