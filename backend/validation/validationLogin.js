const { body, check } = require('express-validator')

exports.validationLogin = [
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong'),
    check('password')
        .notEmpty()
        .withMessage('password tidak boleh kosong')
]

exports.validationForgot = [
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .normalizeEmail()
        .withMessage('email tidak valid')
]

exports.validationVerifyCode = [
    check('code')
        .notEmpty()
        .withMessage('code tidak boleh kosong')
]