const {Sequelize,Op} =  require('sequelize')
const pembayaran = require('../model/Mpembayaran.js')
const formulir =  require('../model/Mformulir.js')
const transaksi =  require('../model/Mtransaksi.js')

module.exports = {
    getAllByToken : async (req, res, next) => {
        const kode = req.params.kode
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await transaksi.count({
            include : [
                {
                    model : formulir,
                    attributes : ["nama", "tanggal_lahir","email"]
                },
                {
                    model : pembayaran
                }
            ],
            where: {
                [Op.or]: [
                    {
                        id_transaksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_transaksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pembayaran_ke: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_transaksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tenggat_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await transaksi.findAll({
            include : [
                {
                    model : formulir,
                    attributes : ["nama", "tanggal_lahir","email"]
                },
                {
                    model : pembayaran
                }
            ],
            where: {
                [Op.or]: [
                    {
                        id_transaksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_transaksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        pembayaran_ke: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tanggal_transaksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tenggat_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_transaksi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All transaksi Success",
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
        await transaksi.findOne({
            where: {
                id_transaksi: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data transaksi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data transaksi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
    
    // tambah : async (req, res, next) => {
    //     const {jumlah_transaksi, minimal_transaksi, jumlah_ansuran, tahun} = req.body
    //     let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        
    //     await transaksi.create({
    //         kode_transaksi : randomNumber+tahun,
    //         jumlah_transaksi : jumlah_transaksi,
    //         minimal_transaksi : minimal_transaksi,
    //         jumlah_ansuran : jumlah_ansuran,
    //         tahun : tahun,
    //         status : "aktif"
    //     }).then(result => {
    //         res.status(201).json({
    //             message: "Data transaksi success",
    //             data: result
    //         })
    //     }).
    //     catch(err => {
    //         next(err)
    //     })
    // },

    // edit : async (req, res, next) => {
    //     const id = req.params.id
    //     const {jumlah_transaksi, minimal_transaksi, jumlah_ansuran, tahun} = req.body
    //     const transaksiUse = await transaksi.findOne({where:{id_transaksi:id}})
    //     if(!transaksi)res.status(401).json({message: "Data transaksi tidak ditemukan"})
    //     await transaksi.update({
    //         jumlah_transaksi : jumlah_transaksi,
    //         minimal_transaksi : minimal_transaksi,
    //         jumlah_ansuran : jumlah_ansuran,
    //         tahun : tahun,
    //     }, {
    //         where : {
    //             id_transaksi : id
    //         }
    //     }).then(result => {
    //         res.status(201).json({
    //             message: "Data transaksi success",
    //         })
    //     }).
    //     catch(err => {
    //         next(err)
    //     })
    // },

    // hapus : async (req, res, next) => {
    //     const id = req.params.id
    //     const transaksiUse = await transaksi.findOne({where:{id_transaksi:id}})
    //     if(!transaksi)res.status(401).json({message: "Data transaksi tidak ditemukan"})
    //     await transaksi.update({
    //         status : "tidak"
    //     }, {
    //         where : {
    //             id_transaksi : id
    //         }
    //     }).then(result => {
    //         res.status(201).json({
    //             message: "Data transaksi success",
    //         })
    //     }).
    //     catch(err => {
    //         next(err)
    //     })
    // }
}