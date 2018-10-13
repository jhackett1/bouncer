var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgendumSchema = new Schema({
  eventID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Agendum', AgendumSchema);