const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises: [
        {
            type: { type: String, required: "Type is required." },
            name: String,
            duration: Number,
            distance: Number,
            weight: Number,
            reps: Number,
            sets: Number,
        },
    ],
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
