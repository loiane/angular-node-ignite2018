const express = require('express');
const router = express.Router();

const attendeeService = require('../services/session.service');
const sessionAPI = '/sessions';

router.get(sessionAPI, (req, res) => {
  attendeeService.getAll(req, res);
});

module.exports = router;
