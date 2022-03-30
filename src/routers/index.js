const router = require('express').Router();
const auth = require('./auth');
const dashboard = require('./Dashboard');

router.use('/auth', auth);
router.use('/dashboard', dashboard);

module.exports = router;
