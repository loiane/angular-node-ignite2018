const Session = require('../model/session.model');
const ReadPreference = require('mongodb').ReadPreference;

require('../mongo/mongo').connect();

function getAll(req, res) {
  const docquery = Session.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(records => res.status(200).json(records))
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

module.exports = {
  getAll
};
