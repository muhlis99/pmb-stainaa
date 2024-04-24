const { body, check } = require('express-validator')


exports.validationRegistrasi = [
    check('nama')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .normalizeEmail()
        .withMessage('email tidak valid'),
    check('pass')
        .notEmpty()
        .withMessage('password tidak boleh kosong')
        .isLength({ min: 8 })
        .withMessage('password tidak kuat'),
    check('conPass')
        .notEmpty()
        .withMessage('conformasi password tidak boleh kosong')
]