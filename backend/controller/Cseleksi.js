const Msoal = require('../model/Msoal.js')
const Mseleksi = require('../model/Mseleksi.js')
const Mformulir = require('../model/Mformulir.js')
const Mjawaban = require('../model/Mjawaban.js')
const Mpertanyaan = require('../model/Mpertanyaan.js')
const Mprodi = require('../model/Mprodi.js')
const MseleksiProdi = require('../model/MseleksiProdi.js')
const Mapprove = require('../model/Mapprove.js')
const {Sequelize,Op} =  require('sequelize')


module.exports = {
    getProdi : async (req, res, next) => {
        await Mprodi.findAll().
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

    getProdiByToken : async (req, res, next) => {
        const kode = req.params.kode
        await MseleksiProdi.findOne({
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
                token: kode,
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data  Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data  Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    pemilihanProdiByid : async (req, res, next) => {
        const id = req.params.id
        await MseleksiProdi.findOne({
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
                id_seleksi_prodi: id,
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data  Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data  Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    seleksiProdi : async (req, res, next) => {
        const id = req.params.id
        const prodiUse = await Mprodi.findOne({
            where : {
                id_prodi : id,
                status : "aktif"
            }
        })
        if(!prodiUse) return res.status(401).json({message :"data not found"})
        await Mprodi.findOne({
            where : {
                id_prodi : {
                    [Op.notIn] : [id]
                }
            }
        }).
        then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Data  Tidak Ditemukan",
                    data: null
                })
            }
            res.status(201).json({
                message: "Data  Ditemukan",
                data: result
            })
        }).
        catch(err => {
            console.log(err)
        })
    },

    createProdi : async (req, res, next) => {
        const {token} = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        await MseleksiProdi.create({
            kode_seleksi_prodi : randomNumber,
            token : token,
            prodi_primer : "",
            prodi_sekunder : "",
            prodi_seleksi_admin : "",
        }).then(result => {
            res.status(201).json({
                message: "Data  prodi success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

    pemilihanProdiUser : async (req, res, next) => {
        const kode = req.params.kode
        const {prodi_primer, prodi_sekunder} = req.body
        await MseleksiProdi.update({
            prodi_primer : prodi_primer,
            prodi_sekunder : prodi_sekunder,
        }, {
            where : {
                token : kode
            }
        })
        
        await Mapprove.update({
            status_seleksi : "selesai"
        }, {
            where : {
                token : kode
            }
        }).then(result => {
            res.status(201).json({
                message: "Data seleksi prodi success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

    ketentuanProdiAdmin : async (req, res, next) => {
        const kode = req.params.kode
        const prodiUse = await MseleksiProdi.findOne({
            where : {
                token : kode
            }
        })
        if(!prodiUse) return res.status(401).json({message : "data not found"})
        const {prodiSeleksiAdmin} = req.body
        await MseleksiProdi.update({
            prodi_seleksi_admin : prodiSeleksiAdmin
        }, {
            where : {
                token : kode
            }
        }).then(result => {
            res.status(201).json({
                message: "Data seleksi prodi success",
            })
        }).
        catch(err => {
            next(err)
        })
    },

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

    getAll : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await Mseleksi.count({
            where: {
                [Op.or]: [
                    {
                        id_seleksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        token: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_seleksi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await Mseleksi.findAll({
            include : [
                {
                    model : Mformulir,
                    attributes : ["nama", "email","tempat_lahir"]
                },
                {
                    model : MseleksiProdi,
                    include : [
                        {
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
                        }
                    ]
                }
            ],
            where: {
                [Op.or]: [
                    {
                        id_seleksi: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        token: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        kode_seleksi: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_seleksi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Registrasi Success",
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

    umumkan : async (req, res, next) => {
        const id = req.params.id
        await Mseleksi.update({
            status_info : 1
        }, {
            where : {
                id_seleksi : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data seleksi ",
            })
        }).catch(err => {
            console.log(err)
        })
    },

    detailJawaban : async (req, res, next) => {
        const id = req.params.id
        await Mjawaban.findAll({
            include : [{
                model : Mpertanyaan,

            }],
            where : {
                id_seleksi : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data seleksi ",
                data : result
            })
        }).catch(err => {
            console.log(err)
        })
    }
}