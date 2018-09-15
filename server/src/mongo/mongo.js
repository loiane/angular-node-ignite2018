const mongoose = require('mongoose');

/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const dbName = 'ignite2018';
const mongoUri = process.env.MONGO_URL || `mongodb://localhost:27017/${dbName}`;
const config = {
  autoIndex: false,
  useNewUrlParser: true,
};

function connect() {
 mongoose.set('debug', true);
 return mongoose.connect(mongoUri, { useNewUrlParser: true });
}

module.exports = {
  connect,
  mongoose
};