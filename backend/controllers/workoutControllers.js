const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET /api/workouts
const getAllWorkouts = async (req, res) => {
  // res.send("getAllWorkouts");
  const workouts = await Workout.find({}).sort({ createAt: -1 });
  res.status(200).json(workouts);
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  // res.send('createWorkout');
  const data = req.body;
  try {
    const workout = await Workout.create({ ...data });
    if (!workout) {
      res.status(400).send("Couldn't create a workout");
    }
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/workouts/:workoutId
const getWorkoutById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }
  const workout = await Workout.findById({ _id: req.params.workoutId });
  if (!workout) return res.status(404).json({ error: "Workout not found" });
  res.status(200).json(workout)

};

// PUT /api/workouts/:workoutId
const updateWorkout = async (req, res) => {
  res.send('updateWorkout');
};

// DELETE /api/workouts/:workoutId
const deleteWorkout = async (req, res) => {
   if (!mongoose.isValidObjectId(req.params.workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }
  const workout = await Workout.findOneAndDelete({ _id: req.params.workoutId });
  if (!workout) return res.status(404).json({ error: "Workout not found" });
  res.status(204).end();
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};
