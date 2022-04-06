const router = require('express').Router();
const { auth } = require('../controllers');

router.post('/login_admin', auth.admin.login);
router.post('/login_costumer', auth.customer.login);

module.exports = router;
