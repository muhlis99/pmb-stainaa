const express = require('express')
const router = express.Router()
const Capprove =  require('../controller/Capprove.js')

router.get('/all', Capprove.getAll)
router.put('/semester/:kode', Capprove.getAllSemester)
router.put('/tahunAjaran', Capprove.getAllTahunAjaran)
router.get('/byId/:id', Capprove.getById)
router.put('/approve', Capprove.approve)


module.exports = router