const express = require('express')
const router = express.Router()
const Cjawaban =  require('../controller/Cjawaban.js')


router.get('/byId/:id', Cjawaban.getById)
router.get('/checkJawaban/:idP/:idS', Cjawaban.getCheckJawaban)
router.post('/postJawaban', Cjawaban.postJawaban)
router.post('/selesai', Cjawaban.selesai)


module.exports = router