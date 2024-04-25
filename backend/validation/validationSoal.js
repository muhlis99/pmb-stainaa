const { body, check } = require('express-validator')

exports.validationSoal = [
    check('nama_soal')
        .notEmpty()
        .withMessage('nama soal tidak boleh kosong'),
    check('jumlah_soal')
        .notEmpty()
        .withMessage('jumlah soal tidak boleh kosong'),
    check('kategori')
        .notEmpty()
        .withMessage('kategori tidak boleh kosong'),
]