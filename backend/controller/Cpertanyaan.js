const Mpertanyaan = require('../model/MPertanyaan.js')
const soal = require('../model/Msoal.js')
const {Sequelize,Op} =  require('sequelize')


module.exports = {
    getAll : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await pertanyaan.count({
            include : [{
                model : soal
            }],
            where: {
                [Op.or]: [
                    {
                        id_pertanyaan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pertanyaan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_pertanyaan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status : "aktif"
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await pertanyaan.findAll({
            include : [{
                model : soal
            }],
            where: {
                [Op.or]: [
                    {
                        id_pertanyaan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pertanyaan: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_pertanyaan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status : "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_pertanyaan", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All pertanyaan Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalItems
                })
            }).
            catch(err => {
                console.log(err)
            })
    },

    getById : async (req, res, next) => {
        const id = req.params.id
        await pertanyaan.findOne({
            where: {
                id_pertanyaan: id,
                status : "aktif"
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data pertanyaan Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pertanyaan Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getCheckPertanyaan : async (req, res, next) => {
        const kode = req.params.kode
        const jmldata = await Mpertanyaan.count({
            where : {
                id_soal : kode,
                status : "aktif"
            }
        })
        const jmlPaketSoal = await soal.findOne({
            where : {
                id_soal : kode,
                status : "aktif"
            }
        })
        if(!jmlPaketSoal) return res.json({message : "data noud foud"})
        const status = jmldata > jmlPaketSoal.jumlah_soal ? "1" : "0"
        res.status(201).json({
            message: "Data pertanyaan success",
            data: status
        })
    },
    
    tambah : async (req, res, next) => {
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const {id_soal, pertanyaan,pilihan_a,
            pilihan_b, pilihan_c, pilihan_d,kunci_jawaban} = req.body
        await Mpertanyaan.create({
            kode_pertanyaan : randomNumber,
            id_soal : id_soal,
            pertanyaan : pertanyaan,
            pilihan_a : pilihan_a,
            pilihan_b : pilihan_b,
            pilihan_c : pilihan_c,
            pilihan_d : pilihan_d,
            kunci_jawaban : kunci_jawaban,
            status : "aktif"
        }).then(result => {
            res.status(201).json({
                message: "Data pertanyaan success",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    edit : async (req, res, next) => {
        const id = req.params.id
        const {id_soal, pertanyaan,pilihan_a,
            pilihan_b, pilihan_c, pilihan_d,kunci_jawaban} = req.body
        await Mpertanyaan.update({
            id_soal : id_soal,
            pertanyaan : pertanyaan,
            pilihan_a : pilihan_a,
            pilihan_b : pilihan_b,
            pilihan_c : pilihan_c,
            pilihan_d : pilihan_d,
            kunci_jawaban : kunci_jawaban,
        }, {
            where : {
                id_pertanyaan : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pertanyaan success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

    hapus : async (req, res, next) => {
        const id = req.params.id
        await Mpertanyaan.update({
            status : "tidak"
        }, {
            where : {
                id_pertanyaan : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pertanyaan success",
            })
        }).
        catch(err => {
            next(err)
        })
    }
}