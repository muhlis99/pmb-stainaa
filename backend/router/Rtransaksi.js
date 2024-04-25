const express = require('express')
const router = express.Router()
const Ctransaksi =  require('../controller/Ctransaksi.js')
// const { validationTransaksi } = require('../validation/validationTransaksi.js')
// const { validationRequest } = require('../validation/validationRequest.js')

// user
router.get('/all/:kode', Ctransaksi.getAllByToken)
router.get('/byId/:id', Ctransaksi.getById)
// router.post('/tambah', validationTransaksi, validationRequest, Ctransaksi.tambah)
// router.put('/edit/:id', validationTransaksi, validationRequest, Ctransaksi.edit)
// router.put('/hapus/:id', Ctransaksi.hapus)
// admin

module.exports = router