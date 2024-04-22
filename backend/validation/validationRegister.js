const { body, check } = require('express-validator')


exports.validationRegistrasi = [
    check('nama')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong'),
    check('password')
        .notEmpty()
        .withMessage('password tidak boleh kosong'),
    check('noHp')
        .notEmpty()
        .withMessage('role tidak boleh kosong')
]