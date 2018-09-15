const express = require('express');
const router = express.Router();

const attendeeService = require('../services/attendee.service');
const attendeeAPI = '/attendees';

router.get(attendeeAPI, (req, res) => {
  attendeeService.getAll(req, res);
});

router.post(attendeeAPI, (req, res) => {
  attendeeService.post(req, res);
});

router.put(`${attendeeAPI}/:id`, (req, res) => {
  attendeeService.put(req, res);
});

router.delete(`${attendeeAPI}/:id`, (req, res) => {
  attendeeService.remove(req, res);
});

module.exports = router;
