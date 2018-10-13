var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendeeSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Attendee', AttendeeSchema);