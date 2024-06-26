const Mformulir = require('../model/Mformulir.js')
const Minformasi = require('../model/Minformasi.js')
const{Sequelize, Op} = require("sequelize")

module.exports = {
    jumlahMhs: async (req, res, next) => {
        const total = await Mformulir.count()
        const totalL = await Mformulir.count({where:{jenis_kelamin : "l"}})
        const totalP = await Mformulir.count({where:{jenis_kelamin : "p"}})

        res.json({
            message : "data success",
            jmlMhs : total,
            jmlMhsCowok : totalL,
            jmlMhsCewek : totalP
        })
    },

    grafik : async (req, res, next) => {
        await Mformulir.findAll({
            attributes: [
                [Sequelize.literal('YEAR(tanggal_daftar)'), 'tahun'],
                [Sequelize.literal('COUNT(id)'), 'jumlahMahasiswa']
            ],
            where: {
                token: { [Op.ne]: null },
                tanggal_daftar: { [Op.ne]: null },
            },
            group: [[Sequelize.literal('YEAR(tanggal_daftar)')]]
        }).then(result => {
            res.status(200).json({
                message: "total formulir  succes",
                data: result,
            })
        }).catch(err => {
            console.log(err);
        })
    },

    grafikJenkel : async (req, res, next) => {
        await Mformulir.findAll({
            attributes: [
                [Sequelize.literal('jenis_kelamin'), 'jenkel'],
                [Sequelize.literal('COUNT(id)'), 'jumlahMahasiswa']
            ],
            where: {
                token: { [Op.ne]: null },
                tanggal_daftar: { [Op.ne]: null },
            },
            group: [[Sequelize.literal('jenis_kelamin')]]
        }).then(result => {
            res.status(200).json({
                message: "total formulir  succes",
                data: result,
            })
        }).catch(err => {
            console.log(err);
        })
    },

    informasi : async (req, res, next) => {
        const kode = req.params.kode
        await Minformasi.findAll().then(result => {
            res.status(200).json({
                message: "total infprmasi  succes",
                data: result,
            })
        }).catch(err => {
            console.log(err);
        })
    }
}