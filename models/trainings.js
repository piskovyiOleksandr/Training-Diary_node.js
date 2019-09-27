const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    status: {
      type: Boolean
    },
    level: {
      type: String
    },
    number: {
      type: String
    },
    name: {
        type: String
    },
    gEx: {
      type: Array
    },
    cEx: {
      type: String
    },
    mEx: {
      type: Array
    },
    sEx: {
      type: Array
    },
    fcEx: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Trainings', schema);