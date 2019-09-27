const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: String
    },
    workoutName: {
      type: String
    },
    number: {
        type: Number
    },
    exercises: {
      type: Array
    },
    recommendations: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Workout', schema);