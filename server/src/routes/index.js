const express = require('express');
const router = express.Router();

router.use('/', require('./attendee.routes'));
router.use('/', require('./session.routes'));

module.exports = router;