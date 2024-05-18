const express = require('express')
const router = express.Router()
const Cseleksi =  require('../controller/Cseleksi.js')

// pemilihan prodi
router.get('/prodi', Cseleksi.getProdi)
router.get('/getProdiByToken/:kode', Cseleksi.getProdiByToken)
router.get('/pemilihanProdiByid/:id', Cseleksi.pemilihanProdiByid)
router.get('/seleksiProdi/:id', Cseleksi.seleksiProdi)
router.post('/createProdi', Cseleksi.createProdi)
router.put('/pemilihanProdiUser/:kode', Cseleksi.pemilihanProdiUser)
router.put('/ketentuanProdiAdmin/:kode', Cseleksi.ketentuanProdiAdmin)
// user
router.get('/pageAwal', Cseleksi.getAwal)
router.get('/byId/:id', Cseleksi.getById)
router.get('/byToken/:kode', Cseleksi.getByToken)
router.post('/tambah', Cseleksi.tambah)

// admin
router.get('/all', Cseleksi.getAll)
router.get('/detailJawaban/:id', Cseleksi.detailJawaban)
router.put('/umumkan/:id', Cseleksi.umumkan)



module.exports = router