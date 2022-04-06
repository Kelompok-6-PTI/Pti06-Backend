const Xendit = require('xendit-node');
const x = new Xendit({
  secretKey: 'xnd_development_PnCkALuy6oWwgRnoiUHWn3n0bcYbtBSxse6gNrMOMoEffpJura0SSjvVFG4S',
});



module.exports = {

  getBalance: async (req, res) => {
    const { Balance } = x;
    const balanceSpecificOptions = {};
    const b = new Balance(balanceSpecificOptions);

    b.getBalance().then((response) => {
      res.json(response);
    });
  },

  addCostumer: async (req, res) => {
    const { Customer } = x;
    const customerSpecificOptions = {};
    const c = new Customer(customerSpecificOptions);

    c.createCustomer({
      referenceID: 'ref-id-example-1',
      givenNames: 'customer 1',
      email: 'customer@website.com',
      mobileNumber: '+6281212345678',
      description: 'dummy customer',
      middleName: 'middle',
      surname: 'surname',
      addresses: [],
    })
      .then( (response) => {
        res.json(response);
      })
      .catch(e => {
        res.json(e.message);
      });
  },

  createInvoice : (req, res) => {
    const { Invoice } = x;
    const invoiceSpecificOptions = {};
    const i = new Invoice(invoiceSpecificOptions);

    i.createInvoice({
      externalID: '2',
      description: 'Isi deskripsi di sini',
      amount: 200000,
      items: [
        {
          name: 'Cuci sepatu',
          quantity: 2,
          price: 100000,
          category: 'Sepatu'
        }
      ],
      customer: {
        given_names: 'John',
        mobile_number: '+6287774441111',
      },
    }).then((response) => {
      res.json(response)
    })
    .catch(e => {
        res.json(e.message);
      });
  },

};