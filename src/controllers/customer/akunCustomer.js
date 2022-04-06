// import model
const { Customer } = require('../../../models');

module.exports = {
  getAllCustomer: (req, res) => {
    Customer.findAll()
      .then((admins) => res.json(admins))
      .catch((err) => res.json(err));
  },

  register: (req, res) => {
    Customer.register(req.body)
      .then((customer) =>
        res.json({ message: `Customer dengan nama ${customer.nama_customer} berhasil ditambahkan` }))
      .catch((err) => res.json(err));
  },

  delete: (req, res) => {
    Customer.destroy({ where: { id: req.params.id } })
      .then(() => res.json({ msg: `Customer berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    Customer.updateCustomer(req.body, req.params.id)
      .then(() => res.json({ msg: "Update Costumer berhasil" }))
      .catch((err) => res.json(err));
  },

};