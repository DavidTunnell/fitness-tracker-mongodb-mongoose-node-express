const router = require("express").Router();
const { Workout } = require("../models");

//get most recent workout
router.get("/workouts", (req, res) => {
    Workout.findOne({})
        .sort({ day: -1 })
        .then((dbTransaction) => {
            const wo = new Workout(dbTransaction);
            wo.totalDuration = wo.getTotalDuration();
            res.json(wo);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

//get last 7 workouts for stats
router.get("/workouts/range", (req, res) => {
    Workout.find({})
        .sort({ day: -1 })
        .limit(7)
        .then((dbTransaction) => {
            const returnArray = [];
            dbTransaction.forEach((element) => {
                const wo = new Workout(element);
                wo.totalDuration = wo.getTotalDuration();
                returnArray.push(wo);
            });
            res.json(returnArray);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

//update a workout (add exercise to existing workout)
router.put("/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        function (error, success) {
            if (error) {
                res.status(400).json(error);
            } else {
                res.json(success);
            }
        }
    );
});

// create a workout
router.post("/workouts", (req, res) => {
    Workout.create({ day: Date.now() }, function (error, success) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(success);
        }
    });
});

module.exports = router;
