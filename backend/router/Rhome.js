const express = require('express')
const router = express.Router()
const Chome = require('../controller/Chome.js')

// admin
router.get('/jumlahMhs', Chome.jumlahMhs)
router.get('/grafik', Chome.grafik)

module.exports = router