const express = require('express')
const router = express.Router()
const Cinformasi =  require('../controller/Cinformasi.js')

router.get('/all', Cinformasi.getAll)
router.get('/allbytoken/:kode', Cinformasi.getAllByToken)
router.get('/byId/:id', Cinformasi.getById)
router.post('/tambah', Cinformasi.tambah)
router.put('/edit/:id', Cinformasi.edit)
router.delete('/hapus/:id', Cinformasi.hapus)
router.post('/umumkanSeleksi/:id', Cinformasi.umumkanSeleksi)


module.exports = router