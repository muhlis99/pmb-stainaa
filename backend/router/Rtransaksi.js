const express = require('express')
const router = express.Router()
const Ctransaksi =  require('../controller/Ctransaksi.js')
// const { validationTransaksi } = require('../validation/validationTransaksi.js')
// const { validationRequest } = require('../validation/validationRequest.js')

// user
router.get('/all/:kode', Ctransaksi.getAllByToken)
router.get('/byId/:id', Ctransaksi.getById)
router.get('/totalPembayaran/:kode', Ctransaksi.getTotalPembayaran)
router.get('/buktiPendaftaran/:kode', Ctransaksi.getBuktiPendaftaran)
router.get('/tenggatPembayaranHabis/:id', Ctransaksi.tenggatPembayaranHabis)
router.post('/tambah', Ctransaksi.tambah)
router.post('/tambahAnsuran', Ctransaksi.tambahAnsuran)
router.put('/tambahTransaksi/:id', Ctransaksi.tambahTransaksi)

// admin

module.exports = router