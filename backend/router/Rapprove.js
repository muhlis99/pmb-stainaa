const express = require('express')
const router = express.Router()
const Capprove =  require('../controller/Capprove.js')

router.get('/all', Capprove.getAll)
router.get('/byId/:id', Capprove.getById)
router.put('/approve', Capprove.approve)


module.exports = router