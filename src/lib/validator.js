const { body, validationResult } = require('express-validator');
const { Admin } = require('../../models');

const registerAdminRules = () => {
  return [
    body('namaAdmin', 'Nama Admin tidak boleh kosong').isLength({ min: 1 }).trim(),
    body('namaAdmin').custom(value => {
      return Admin.findOne({ where: { nama_admin: value } }).then(namaAdmin => {
        if (namaAdmin) {
          return Promise.reject('Nama Admin Telah digunakan');
        }
      });
    }),
    body('password', 'Password tidak boleh kosong').isLength({ min: 1 }),
  ]
}

const updateAdminRules = () => {
  return [
    body('namaAdmin', 'Nama Admin tidak boleh kosong').isLength({ min: 1 }).trim(),
    body('namaAdmin').custom((value, {req, res}) => {
      return Admin.findOne({ where: { nama_admin: value } }).then(namaAdmin => {
        if (namaAdmin && namaAdmin.id != req.params.id) {
          return Promise.reject('Nama Admin Telah digunakan');
        }
      });
    }),
  ]
}

const artikel = () => {
  return [
    body('judulArtikel', 'Judul Artikel tidak boleh kosong').isLength({ min: 1 }).trim(),
    body('isiArtikel', 'Isi Artikel tidak boleh kosong').isLength({ min: 1 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({ errors: extractedErrors })
}

module.exports = {
  updateAdminRules,
  registerAdminRules,
  artikel,
  validate,
}