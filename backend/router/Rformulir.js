const express =  require('express')
const router =  express.Router()
const Cformulir = require('../controller/Cformulir.js')
const { validationRequest } = require('../validation/validationRequest.js')
const { validationForm1, validationForm2, validationForm3, validationForm4 } = require('../validation/validationFormulir.js')
const path = require('path')

// admin
router.get('/getAllCheck', Cformulir.getAllCheck)
// user
router.get('/getByToken/:kode', Cformulir.getByToken)
router.get('/checkByToken/:kode', Cformulir.checkByToken)
router.post('/createFirst/:kode', Cformulir.createFirst)
router.put('/form1/:kode', validationForm1,validationRequest,Cformulir.form1)
router.put('/form2/:kode', validationForm2,validationRequest,Cformulir.form2)
router.put('/form3/:kode', validationForm3,validationRequest,Cformulir.form3)
router.put('/form4/:kode', validationForm4,validationRequest,Cformulir.form4)
router.put('/formUpload/:kode', Cformulir.formUpload)
router.use('/seeImage/pmb/ijazah', express.static(path.join('./tmp_pmb/ijazah')))
router.use('/seeImage/pmb/kk', express.static(path.join('./tmp_pmb/kk')))
router.use('/seeImage/pmb/ktp', express.static(path.join('./tmp_pmb/ktp')))
router.use('/seeImage/pmb/diri', express.static(path.join('./tmp_pmb/diri')))


module.exports = router