const Msoal = require('../model/Msoal.js')
const Mseleksi = require('../model/Mseleksi.js')
const Mformulir = require('../model/Mformulir.js')
const {Sequelize,Op} =  require('sequelize')


module.exports = {
    getAwal : async (req, res, next) => {
        await Msoal.sum('jumlah_soal', {
            where : {
                status : "aktif"
            }
        }).
        then(result => {
            res.status(201).json({
                message: "Data seleksi Ditemukan",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    getById : async (req, res, next) => {
        const id = req.params.id
        await Mseleksi.findOne({
            include : [{
                attributes : ["token","nama","email","tempat_lahir"],
                model : Mformulir
            }],
            where: {
                id_seleksi: id,
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data seleksi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data seleksi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getByToken : async (req, res, next) => {
        const kode = req.params.kode
        await Mseleksi.findOne({
            include : [{
                attributes : ["token","nama","email","tempat_lahir"],
                model : Mformulir
            }],
            where: {
                token: kode,
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data seleksi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data seleksi Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    tambah : async (req, res, next) => {
        const {token, total_soal} = req.body 
        const date = new Date().toLocaleDateString('en-CA')
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        await Mseleksi.create({
            kode_seleksi : randomNumber,
            token : token,
            tanggal_mulai : date,
            tanggal_akhir : "",
            total_soal : total_soal,
            total_selesai : "",
            total_belum : total_soal,
            total_benar : "",
            total_salah : "",
            total_durasi : "",
            score : "",
            status_info : "0"
        }).then(result => {
            res.status(201).json({
                message: "Data seleksi Ditemukan",
                data: result
            })
        }).catch(err => {
            console.log(err)
        })
    },
}