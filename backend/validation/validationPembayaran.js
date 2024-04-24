const { body, check } = require('express-validator')
const registrasi = require('../model/Mregistrasi.js')

exports.validationPembayaran = [
    check('jumlah_pembayaran')
        .notEmpty()
        .withMessage('jumlah pembayaran tidak boleh kosong'),
    check('minimal_pembayaran')
        .notEmpty()
        .withMessage('minimal_pembayaran tidak boleh kosong'),
    check('jumlah_ansuran')
        .notEmpty()
        .withMessage('jumlah ansuran tidak boleh kosong'),
    check('tahun')
        .notEmpty()
        .withMessage('tahun password tidak boleh kosong')
]