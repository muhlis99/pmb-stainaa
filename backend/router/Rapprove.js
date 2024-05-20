const express = require('express')
const router = express.Router()
const Capprove =  require('../controller/Capprove.js')

router.get('/all', Capprove.getAll)
router.get('/semester/:kode', Capprove.getAllSemester)
router.get('/semesterByKode/:kode', Capprove.getSemesterByKode)
router.get('/prodiByKode/:kode', Capprove.getProdiByKode)
router.get('/tahunAjaran', Capprove.getAllTahunAjaran)
router.get('/byId/:id', Capprove.getById)
router.get('/byToken/:kode', Capprove.getByToken)
router.get('/mhsByNik/:nik', Capprove.getMhsByNik)
router.put('/approve', Capprove.approve)


module.exports = router