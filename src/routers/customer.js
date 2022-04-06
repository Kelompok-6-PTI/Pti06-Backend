const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');

const { auth } = require('../controllers');
const { customer } = require('../controllers');



//Lihat Artikel dan Layanan
router.get('/get_all_artikel', customer.lihatArtikel.allArtikel);
router.get('/get_artikel_by_id/:id', customer.lihatArtikel.getArtikelById);
router.get('/get_all_kategori', customer.lihatLayanan.getAllKategori);
router.get('/get_kategori_by_id/:idKategori', customer.lihatLayanan.getKategori);
router.get('/get_all_layanan', customer.lihatLayanan.getAllLayanan);
router.get('/get_layanan_by_id/:idLayanan', customer.lihatLayanan.getLayanan);

//Endpoint customer yg sudah login dan logout
router.get('/whoami', authenticate.customer, auth.customer.whoami); //setelah login
router.get('/logout', authenticate.customer, auth.customer.logout); //setelah login

//Akun Costumer
router.post('/register_customer', customer.akunCustomer.register);
router.put('/update_customer/:id', authenticate.customer, customer.akunCustomer.update); //setelah login

//Pemesanan


//-------------sementara-------------------
router.get('/get_all_customer', customer.akunCustomer.getAllCustomer);

module.exports = router;

