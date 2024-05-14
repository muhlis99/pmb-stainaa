const informasi =  require('../model/Minformasi.js')
const Mseleksi = require('../model/Mseleksi.js')
const Mprodi = require('../model/Mprodi.js')
const MseleksiProdi = require('../model/MseleksiProdi.js')
const Mformulir = require('../model/Mformulir.js')
const {Sequelize,Op, where} =  require('sequelize')


module.exports = {
    getAll : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await informasi.count({
            where: {
                [Op.or]: [
                    {
                        id_informasi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        judul: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        isi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        token: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await informasi.findAll({
            where: {
                [Op.or]: [
                    {
                        id_informasi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        judul: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        isi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        token: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_informasi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All informasi Success",
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

    getAllByToken : async (req, res, next) => {
        const kode =  req.params.kode
        await informasi.findAll({
            where : {
                token : kode
            }
        }).
        then(result => {
            res.status(200).json({
                message: "Get All informasi Success",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    getById : async (req, res, next) => {
        const id = req.params.id
        await informasi.findOne({
            where: {
                id_informasi: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data informasi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data informasi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
    
    tambah : async (req, res, next) => {
        const {judul, isi, token} = req.body
        const date = new Date().toLocaleDateString('en-CA')
        await informasi.create({
            judul : judul,
            isi : isi,
            token : token,
            tanggal : date
        }).then(result => {
            res.status(201).json({
                message: "Data informasi success",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    edit : async (req, res, next) => {
        const id = req.params.id
        const {judul, isi} = req.body
        const dataUse = await informasi.findOne({where : {id_informasi:id}})
        if(!dataUse) return res.json({message : "data not found"})
        await informasi.update({
            judul : judul,
            isi : isi,
        }, {
            where : {
                id_informasi :id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data informasi success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

    hapus : async (req, res, next) => {
        const id = req.params.id
        await informasi.destroy({
            where : {
                id_informasi : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data informasi success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

    umumkanSeleksi : async (req, res, next) => {
        const id = req.params.id
        const dataUse = await Mseleksi.findOne({include:[{model:Mformulir}],where:{id_seleksi:id}})
        const seleksiProdi = await MseleksiProdi.findOne({
            include : [{
                attributes : ["token","nama","email","tempat_lahir"],
                model : Mformulir
            }, {
                model : Mprodi,
                attributes : ["nama_prodi", "code_prodi"],
                as : "prodiprimer"
            },{
                model : Mprodi,
                attributes : ["nama_prodi", "code_prodi"],
                as : "prodisekunder"
            },{
                model : Mprodi,
                attributes : ["nama_prodi", "code_prodi"],
                as : "prodiseleksiadmin"
            }],
            where: {
                token: dataUse.formulirs[0].token,
            }
        })
        const date = new Date().toLocaleDateString('en-CA')
        if(!dataUse) return res.json({message:"data not found"})
        const isiPengumunan = `selamat anda telah menyelesaikan pertanyaan dari server PMB STAINAA.&#13;&#10;
                                peserta mahasiswa baru atas nama ${dataUse.formulirs[0].nama} telah lulus ujian.&#13;&#10;
                                adapun prodi yang anda pilih
                                1. prodi utama adalah ${seleksiProdi.prodiprimer[0].nama_prodi}
                                2. prodi kedua adalah ${seleksiProdi.prodisekunder[0].nama_prodi}
                                demikian yang dapat kami sampaikan, terimakasih semuanya :) :)`
        await informasi.create({
            judul : "Hasil seleksi soal",
            isi : isiPengumunan,
            token : dataUse.token,
            tanggal : date
        }).then(result => {
            res.status(201).json({
                message: "Data informasi success",
            })
        }).
        catch(err => {
            next(err)
        })
    }
}