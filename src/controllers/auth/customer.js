// import jwt untuk membuat tken
const jwt = require('jsonwebtoken');
// import model
const bcrypt = require('bcrypt');
const { Customer } = require('../../../models');

// buat fungsi untuk membuat token jwt
const generateToken = (id, namaCustomer) => {
  // tentukan isi / payload dari jwt
  const payload = {
    id, // nilai id dalam payload didapat dari id dari paramter fungsi generateToken
    namaCustomer, // nilai nama_admin dalam payload didapat dari nama_admin dari paramter fungsi generateToken
  };

  // kunci yang digunakan untuk membuat jwt
  const secret = 'secret';

  // buat token jwt menggunakan payload & kunci rahasia yang telah ditentukan
  return jwt.sign(payload, secret);
};

module.exports = {
  login: (req, res) => {
    const { namaCustomer, password } = req.body;

    Customer.findOne({
      where: { nama_customer: namaCustomer }, 
    }).then(async (customer) => {
      const match = await bcrypt.compare(password, customer.password);

      if (match) {
        const accessToken = generateToken(customer.id, customer.nama_customer); 

        return res
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .status(200)
          .json({ message: 'Log in Berhasil' });
      }
      if (!match) {
        return res.json({ message: 'Username atau Password Salah' });
      }
    }).catch((err) => res.json({ message: 'Username atau Password Salah' }));
  },

  whoami: (req, res) => res.json({
    id: req.user.id,
    nama_customer: req.user.nama_customer,
    no_telepon: req.user.no_telepon,
    alamat: req.user.alamat 
  }),

  logout: (req, res) => res
    .clearCookie('accessToken')
    .status(200)
    .json({ message: 'Berhasil logout' }),

};
