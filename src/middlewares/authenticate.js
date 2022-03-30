const passport = require('../lib/passport');

module.exports = {
  admin: passport.authenticate('Admin', { session: false }),
};
