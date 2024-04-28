const express = require('express')
const router = express.Router()
const Cseleksi =  require('../controller/Cseleksi.js')

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