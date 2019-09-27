const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String
    },
    group: {
      type: String
    },
    description: {
      type: String
    },
    nameEng: {
      type: Number 
    },
    images: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Exercise', schema);