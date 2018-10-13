var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgendumSchema = new Schema({
  eventId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Agendum', AgendumSchema);