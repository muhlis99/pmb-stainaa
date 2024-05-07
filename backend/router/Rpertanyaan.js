const express = require('express')
const router = express.Router()
const Cpertanyaan =  require('../controller/Cpertanyaan.js')
const { validationPertanyaan } = require('../validation/validationPertanyaan.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', Cpertanyaan.getAll)
router.get('/byId/:id', Cpertanyaan.getById)
router.get('/bySoal/:kode', Cpertanyaan.getBySoal)
router.get('/checkPertanyaan/:kode', Cpertanyaan.getCheckPertanyaan)
router.post('/tambah', validationPertanyaan, validationRequest, Cpertanyaan.tambah)
router.put('/edit/:id', Cpertanyaan.edit)
router.put('/hapus/:id', Cpertanyaan.hapus)


module.exports = router