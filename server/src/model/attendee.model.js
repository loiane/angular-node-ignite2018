const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendeeSchema = new Schema(
    {
      name: { type: String, require: true },
      email: String,
      phones: [{
          areaCode: String,
          phoneNumber: String
      }]
    },
    {
      collection: 'attendees',
      read: 'nearest'
    }
  );
  
  const Attendee = mongoose.model('Attendee', attendeeSchema);
  
  module.exports = Attendee;