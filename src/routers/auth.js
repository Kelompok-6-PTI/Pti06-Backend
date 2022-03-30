const router = require('express').Router();
const { auth } = require('../controllers');

router.post('/login_admin', auth.admin.login);

module.exports = router;
