const express = require('express')
const router = express.Router()
const Cregistrasi =  require('../controller/Cregistrasi.js')
const { validationRegistrasi } = require('../validation/validationRegister.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', Cregistrasi.getAll)
router.get('/byId/:id', Cregistrasi.getById)
router.post('/daftar', validationRegistrasi, validationRequest, Cregistrasi.daftar)
router.post('/verifikasi', Cregistrasi.verifikasi)


module.exports = router