const Mpertanyaan = require('../model/Mpertanyaan.js')
const Mjawaban = require('../model/Mjawaban.js')
const {Sequelize,Op, where} =  require('sequelize')


module.exports = {
    getById : async (req, res, next) => {
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
    
    getCheckJawaban : async (req, res, next) => {
        const {idP, idS} = req.params
        await Mjawaban.findOne({
            where: {
                id_pertanyaan : idP,
                id_seleksi : idP
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

    postJawaban : async (req, res, next) => {
        const {id_pertanyaan, id_seleksi, jawaban} = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const checkRecord = await Mjawaban.count({
            where : {
                id_pertanyaan : id_pertanyaan,
                id_seleksi : id_seleksi
            }
        })
        const kunciJawaban = await Mpertanyaan.findOne({where:{id_pertanyaan:id_pertanyaan}})
        const statusJawaban = kunciJawaban.kunci_jawaban == jawaban ? "benar" : "salah"

        if (checkRecord > 0) {
            await Mjawaban.update({
                jawaban : jawaban,
                status : statusJawaban
            }, {
                where : {
                    id_pertanyaan : id_pertanyaan,
                    id_seleksi : id_seleksi
                }
            }).then(result => {
                res.status(201).json({
                    message: "Data jawaban success",
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            await Mjawaban.create({
                kode_jawaban : randomNumber, 
                id_pertanyaan : id_pertanyaan,
                id_seleksi : id_seleksi,
                jawaban : jawaban,
                status : statusJawaban
            }).then(result => {
                res.status(201).json({
                    message: "Data jawaban success",
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }

}