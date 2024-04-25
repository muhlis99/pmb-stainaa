const express = require('express')
const router = express.Router()
const Cequipment = require('../controller/Cequipment.js')

// alat transportasi
router.get('/alatTransportasi/all', Cequipment.alatTransportasiAll)
router.get('/alatTransportasi/getById/:id', Cequipment.alatTransportasiGetById)
router.get('/alatTransportasi/getByCode/:code', Cequipment.alatTransportasiGetByCode)
// agama
router.get('/agama/all', Cequipment.agamaAll)
router.get('/agama/getById/:id', Cequipment.agamaGetById)
// jalurPendaftaran
router.get('/jalurPendaftaran/all', Cequipment.jalurPendaftaranAll)
router.get('/jalurPendaftaran/getById/:id', Cequipment.jalurPendaftaranGetById)
router.get('/jalurPendaftaran/getByCode/:code', Cequipment.jalurPendaftaranGetByCode)
// jenisPendaftaran
router.get('/jenisPendaftaran/all', Cequipment.jenisPendaftaranAll)
router.get('/jenisPendaftaran/getById/:id', Cequipment.jenisPendaftaranGetById)
router.get('/jenisPendaftaran/getByCode/:code', Cequipment.jenisPendaftaranGetByCode)
// jenisTinggal
router.get('/jenisTinggal/all', Cequipment.jenisTinggalAll)
router.get('/jenisTinggal/getById/:id', Cequipment.jenisTinggalGetById)
router.get('/jenisTinggal/getByCode/:code', Cequipment.jenisTinggalGetByCode)
// pekerjaan
router.get('/pekerjaan/all', Cequipment.pekerjaanAll)
router.get('/pekerjaan/getById/:id', Cequipment.pekerjaanGetById)
router.get('/pekerjaan/getByCode/:code', Cequipment.pekerjaanGetByCode)
// pendidikan
router.get('/pendidikan/all', Cequipment.pendidikanAll)
router.get('/pendidikan/getById/:id', Cequipment.pendidikanGetById)
router.get('/pendidikan/getByCode/:code', Cequipment.pendidikanGetByCode)
// penghasilan
router.get('/penghasilan/all', Cequipment.penghasilanAll)
router.get('/penghasilan/getById/:id', Cequipment.penghasilanGetById)
router.get('/penghasilan/getByCode/:code', Cequipment.penghasilanGetByCode)
// negara
router.get('/negara/all', Cequipment.negaraAll)
router.get('/negara/getByCode/:code', Cequipment.negaraGetByCode)
// provinsi
router.get('/provinsi/all', Cequipment.provinsiAll)
router.get('/provinsi/getByCode/:code', Cequipment.provinsiGetByCode)
router.get('/provinsi/getByCodeNegara/:code', Cequipment.provinsiGetByCodeNegara)
// kabupaten
router.get('/kabupaten/all', Cequipment.kabupatenAll)
router.get('/kabupaten/getByCode/:code', Cequipment.kabupatenGetByCode)
router.get('/kabupaten/getByCodeProvinsi/:code', Cequipment.kabupatenGetByCodeProvinsi)
// kecamatan
router.get('/kecamatan/all', Cequipment.kecamatanAll)
router.get('/kecamatan/getByCode/:code', Cequipment.kecamatanGetByCode)
router.get('/kecamatan/getByCodeKabupaten/:code', Cequipment.kecamatanGetByCodeKabupaten)
// desa
router.get('/desa/all', Cequipment.desaAll)
router.get('/desa/getByCode/:code', Cequipment.desaGetByCode)
router.get('/desa/getByCodeKecamatan/:code', Cequipment.desaGetByCodeKecamatan)

module.exports = router