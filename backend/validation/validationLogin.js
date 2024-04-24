const { body, check } = require('express-validator')

exports.validationLogin = [
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .normalizeEmail()
        .withMessage('email tidak valid'),
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

exports.validationResetPass = [
    check('pass')
        .notEmpty()
        .withMessage('password tidak boleh kosong')
        .isLength({ min: 8 })
        .withMessage('password tidak kuat'),
    check('conPass')
        .notEmpty()
        .withMessage('conformasi password tidak boleh kosong')
        .isLength({ min: 8 })
        .withMessage('password tidak kuat')
]