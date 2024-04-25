const soal =  require('../model/Msoal.js')
const {Sequelize,Op} =  require('sequelize')


module.exports = {
    getAll : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await soal.count({
            where: {
                [Op.or]: [
                    {
                        id_soal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_soal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_soal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        jumlah_soal: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await soal.findAll({
            where: {
                [Op.or]: [
                    {
                        id_soal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_soal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama_soal: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        jumlah_soal: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_soal", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All soal Success",
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
        await soal.findOne({
            where: {
                id_soal: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data soal Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data soal Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
    
    tambah : async (req, res, next) => {
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const {nama_soal, jumlah_soal, kategori} = req.body
        await soal.create({
            kode_soal : randomNumber,
            nama_soal : nama_soal,
            jumlah_soal : jumlah_soal,
            kategori : kategori,
            status : "aktif"
        }).then(result => {
            res.status(201).json({
                message: "Data soal success",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    edit : async (req, res, next) => {
        const id = req.params.id
        const {nama_soal, jumlah_soal, kategori} = req.body
        await soal.update({
            nama_soal : nama_soal,
            jumlah_soal : jumlah_soal,
            kategori : kategori,
        }, {
            where : {
                id_soal : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data soal success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

    hapus : async (req, res, next) => {
        const id = req.params.id
        await soal.update({
            status : "tidak"
        }, {
            where : {
                id_soal : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data soal success",
            })
        }).
        catch(err => {
            next(err)
        })
    }
}