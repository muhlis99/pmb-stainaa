const express = require('express')
const router = express.Router()
const Cseleksi =  require('../controller/Cseleksi.js')


router.get('/pageAwal', Cseleksi.getAwal)
router.get('/byId/:id', Cseleksi.getById)
router.get('/byToken/:kode', Cseleksi.getByToken)
router.post('/tambah', Cseleksi.tambah)

module.exports = router