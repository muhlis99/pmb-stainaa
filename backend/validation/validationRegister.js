const { body, check } = require('express-validator')
const registrasi = require('../model/Mregistrasi.js')

exports.validationRegistrasi = [
    check('nama')
        .notEmpty()
        .withMessage('nama tidak boleh kosong'),
    check('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .normalizeEmail()
        .withMessage('email tidak valid')
        .custom(async value => {
            const user = await registrasi.findOne({
                where : {
                    email : value
                }
            });
            if (user) {
                throw new Error('email sudah ada');
            }
        }),
    check('pass')
        .notEmpty()
        .withMessage('password tidak boleh kosong')
        .isLength({ min: 8 })
        .withMessage('password tidak kuat'),
    check('conPass')
        .notEmpty()
        .withMessage('conformasi password tidak boleh kosong')
]