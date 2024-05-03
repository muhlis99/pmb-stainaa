const express = require('express')
const router = express.Router()
const Ctransaksi =  require('../controller/Ctransaksi.js')
const path = require('path')

router.use('/seeImage/BuktiPembayaran', express.static(path.join('./tmp_pmb/transaksi')))
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
router.get('/allTransaksiMhs', Ctransaksi.gtAllTransaksiMhs)
router.get('/checkTransaksi/:kode', Ctransaksi.checkTransaksi)
router.put('/editTenggatPembayaran/:id', Ctransaksi.editTenggatPembayaran)



module.exports = router