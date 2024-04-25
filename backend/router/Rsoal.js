const express = require('express')
const router = express.Router()
const Csoal =  require('../controller/Csoal.js')
const { validationSoal } = require('../validation/validationSoal.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', Csoal.getAll)
router.get('/byId/:id', Csoal.getById)
router.post('/tambah', validationSoal, validationRequest, Csoal.tambah)
router.put('/edit/:id', Csoal.edit)
router.put('/hapus/:id', Csoal.hapus)


module.exports = router