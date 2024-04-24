const express =  require('express')
const router =  express.Router()
const Cformulir = require('../controller/Cformulir.js')
const { validationLogin, validationForgot, validationVerifyCode } = require('../validation/validationLogin.js')
const { validationRequest } = require('../validation/validationRequest.js')


router.post('/createFirst/:kode', Cformulir.createFirst)
router.put('/form1/:kode', Cformulir.form1)
router.put('/form2/:kode', Cformulir.form2)
router.put('/form3/:kode', Cformulir.form3)
router.put('/form4/:kode', Cformulir.form4)
router.put('/formUpload/:kode', Cformulir.formUpload)

module.exports = router