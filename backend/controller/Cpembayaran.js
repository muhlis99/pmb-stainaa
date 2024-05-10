const pembayaran =  require('../model/Mpembayaran.js')
const {Sequelize,Op} =  require('sequelize')

module.exports = {
    getAll : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await pembayaran.count({
            where: {
                [Op.or]: [
                    {
                        id_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        jumlah_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        minimal_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        jumlah_ansuran: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await pembayaran.findAll({
            where: {
                [Op.or]: [
                    {
                        id_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        jumlah_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        minimal_pembayaran: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        jumlah_ansuran: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ],
                status : "aktif"
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_pembayaran", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All pembayaran Success",
                    data: result,
                    total_data: totalPage,
                    per_page: perPage,
                    current_page: currentPage,
                    total_page: totalItems
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getById : async (req, res, next) => {
        const id = req.params.id
        await pembayaran.findOne({
            where: {
                id_pembayaran: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data pembayaran Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data pembayaran Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
    
    tambah : async (req, res, next) => {
        const {jumlah_pembayaran, minimal_pembayaran, jumlah_ansuran, tahun} = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        
        await pembayaran.create({
            kode_pembayaran : randomNumber+tahun,
            jumlah_pembayaran : jumlah_pembayaran,
            minimal_pembayaran : minimal_pembayaran,
            jumlah_ansuran : jumlah_ansuran,
            tahun : tahun,
            status : "aktif"
        }).then(result => {
            res.status(201).json({
                message: "Data pembayaran success",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    edit : async (req, res, next) => {
        const id = req.params.id
        const {jumlah_pembayaran, minimal_pembayaran, jumlah_ansuran, tahun} = req.body
        const pembayaranUse = await pembayaran.findOne({where:{id_pembayaran:id}})
        if(!pembayaran)res.status(401).json({message: "Data pembayaran tidak ditemukan"})
        await pembayaran.update({
            jumlah_pembayaran : jumlah_pembayaran,
            minimal_pembayaran : minimal_pembayaran,
            jumlah_ansuran : jumlah_ansuran,
            tahun : tahun,
        }, {
            where : {
                id_pembayaran : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pembayaran success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

    hapus : async (req, res, next) => {
        const id = req.params.id
        const pembayaranUse = await pembayaran.findOne({where:{id_pembayaran:id}})
        if(!pembayaran)res.status(401).json({message: "Data pembayaran tidak ditemukan"})
        await pembayaran.update({
            status : "tidak"
        }, {
            where : {
                id_pembayaran : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data pembayaran success",
            })
        }).
        catch(err => {
            next(err)
        })
    }
}