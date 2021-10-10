const router = require("express").Router();
const { Workout } = require("../models");

//api routes go here
router.get("/workouts", (req, res) => {
    Workout.findOne({}, {}, { sort: { day: -1 } })
        .then((dbTransaction) => {
            res.json(dbTransaction);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;
