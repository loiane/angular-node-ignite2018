const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
    {
      name: { type: String, require: true }
    },
    {
      collection: 'sessions',
      read: 'nearest'
    }
  );
  
  const Session = mongoose.model('Session', sessionSchema);
  
  module.exports = Session;