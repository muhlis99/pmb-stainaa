const express = require('express')
const router = express.Router()
const Clogin = require('../controller/Clogin.js')
const { validationLogin, validationForgot, validationVerifyCode,validationResetPass } = require('../validation/validationLogin.js')
const { validationRequest } = require('../validation/validationRequest.js')


router.get('/me', Clogin.me)
router.post('/in', validationLogin, validationRequest, Clogin.login)
router.delete('/out', Clogin.logout)
router.post('/forgot', validationForgot, validationRequest, Clogin.forgot)
router.post('/verify', validationVerifyCode, validationRequest, Clogin.verifyCode)
router.put('/resetPasswordByForgot/:id', validationResetPass,validationRequest,Clogin.resetPasswordByForgot)

module.exports = router