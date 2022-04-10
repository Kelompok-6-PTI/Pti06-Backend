// import model
const { Customer } = require('../../../models');

module.exports = {

  register: (req, res) => {
    Customer.register(req.body)
      .then((customer) =>
        res.json({ msg: `Register Berhasil` }))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    Customer.updateCustomer(req.body, req.params.id)
      .then(() => res.json({ msg: "Update Profil Berhasil" }))
      .catch((err) => res.json(err));
  },

};