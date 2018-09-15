const express = require('express');
const router = express.Router();

router.use('/', require('./attendee.routes'));

module.exports = router;