const Mpertanyaan = require('../model/Mpertanyaan.js')
const Mjawaban = require('../model/Mjawaban.js')
const Mseleksi = require('../model/Mseleksi.js')
const { Sequelize, Op, where } = require('sequelize')


module.exports = {
    getById: async (req, res, next) => {
        const id = req.params.id
        await Mjawaban.findOne({
            where: {
                id_jawaban: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data jawaban Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jawaban Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getCheckJawaban: async (req, res, next) => {
        const { idP, idS } = req.params
        await Mjawaban.findOne({
            where: {
                id_pertanyaan: idP,
                id_seleksi: idS
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data jawaban Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data jawaban Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                console.log(err)
            })
    },

    postJawaban: async (req, res, next) => {
        const { id_pertanyaan, id_seleksi, jawaban } = req.body
        const seleksiBelum = await Mseleksi.findOne({ where: { id_seleksi: id_seleksi } })
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const checkRecord = await Mjawaban.count({
            where: {
                id_pertanyaan: id_pertanyaan,
                id_seleksi: id_seleksi
            }
        })
        const kunciJawaban = await Mpertanyaan.findOne({ where: { id_pertanyaan: id_pertanyaan } })
        const statusJawaban = kunciJawaban.kunci_jawaban == jawaban ? "benar" : "salah"

        const date = new Date().toLocaleDateString('en-CA')

        if (checkRecord > 0) {
            await Mjawaban.update({
                jawaban: jawaban,
                status: statusJawaban
            }, {
                where: {
                    id_pertanyaan: id_pertanyaan,
                    id_seleksi: id_seleksi
                }
            }).then(result => {
                res.status(201).json({
                    message: "Data jawaban success",
                })
            }).
                catch(err => {
                    console.log(err)
                })
        } else {
            await Mjawaban.create({
                kode_jawaban: randomNumber,
                id_pertanyaan: id_pertanyaan,
                id_seleksi: id_seleksi,
                jawaban: jawaban,
                status: statusJawaban
            })

            const totalSelesai = await Mjawaban.count({
                where: {
                    id_seleksi: id_seleksi
                }
            })
            const totalBelum = seleksiBelum.total_belum - 1

            await Mseleksi.update({
                tanggal_akhir: date,
                total_selesai: totalSelesai,
                total_belum: totalBelum
            }, {
                where: {
                    id_seleksi: id_seleksi
                }
            }).then(result => {
                res.status(201).json({
                    message: "Data jawaban success",
                })
            }).
                catch(err => {
                    console.log(err)
                })
        }
    },

    selesai: async (req, res, next) => {
        const { id_pertanyaan, id_seleksi, jawaban, durasi } = req.body
        const seleksiBelum = await Mseleksi.findOne({ where: { id_seleksi: id_seleksi } })
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const kunciJawaban = await Mpertanyaan.findOne({ where: { id_pertanyaan: id_pertanyaan } })
        const statusJawaban = kunciJawaban.kunci_jawaban == jawaban ? "benar" : "salah"
        const date = new Date().toLocaleDateString('en-CA')
        await Mjawaban.create({
            kode_jawaban: randomNumber,
            id_pertanyaan: id_pertanyaan,
            id_seleksi: id_seleksi,
            jawaban: jawaban,
            status: statusJawaban
        })

        const totalSelesai = await Mjawaban.count({
            where: {
                id_seleksi: id_seleksi
            }
        })
        const totalBelum = seleksiBelum.total_belum - 1
        const totalBenar = await Mjawaban.count({
            where: {
                id_seleksi: id_seleksi,
                status: "benar"
            }
        })
        const totalSalah = await Mjawaban.count({
            where: {
                id_seleksi: id_seleksi,
                status: "salah"
            }
        })
        const score = totalBenar * 4
        await Mseleksi.update({
            tanggal_akhir: date,
            total_selesai: totalSelesai,
            total_belum: totalBelum,
            total_benar: totalBenar,
            total_salah: totalSalah,
            total_durasi: durasi,
            score: score
        }, {
            where: {
                id_seleksi: id_seleksi
            }
        }).then(result => {
            res.status(201).json({
                message: "Data jawaban success",
            })
        }).
            catch(err => {
                console.log(err)
            })

    }

}