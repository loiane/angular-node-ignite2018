const mongoose = require('mongoose');

/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const mongoUri = process.env.MONGO_URL || `mongodb://localhost:27017/ignite2018`;

function connect() {
 mongoose.set('debug', true);
 return mongoose.connect(mongoUri);
}

module.exports = {
  connect,
  mongoose
};