const express = require('express')
const router = express.Router()
const Cpembayaran =  require('../controller/Cpembayaran.js')
const { validationPembayaran } = require('../validation/validationPembayaran.js')
const { validationRequest } = require('../validation/validationRequest.js')

router.get('/all', Cpembayaran.getAll)
router.get('/byId/:id', Cpembayaran.getById)
router.post('/tambah', validationPembayaran, validationRequest, Cpembayaran.tambah)
router.put('/edit/:id', validationPembayaran, validationRequest, Cpembayaran.edit)
router.put('/hapus/:id', Cpembayaran.hapus)


module.exports = router