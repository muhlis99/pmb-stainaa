const express = require('express')
const router = express.Router()
const Chome = require('../controller/Chome.js')

// admin
router.get('/jumlahMhs', Chome.jumlahMhs)
router.get('/grafik', Chome.grafik)
// user
router.get('/informasi/:token', Chome.informasi)


module.exports = router