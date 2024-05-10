const informasi =  require('../model/Minformasi.js')
const Mseleksi = require('../model/Mseleksi.js')
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
        const date = new Date().toLocaleDateString('en-CA')
        if(!dataUse) return res.json({message:"data not found"})
        const isiPengumunan = `selamat anda telah menyelesaikan proses pengisian formulis\n\
                            peserta mahasiswa baru, adapun rincian nya sebagaiman berikut\n\
                            data diri
                            1. nama : ${dataUse.formulirs[0].nama}\n\<br>
                            2. tempat lahir : ${dataUse.formulirs[0].tempat_lahir}\n\<br>
                            3. jenis kelamin : ${dataUse.formulirs[0].jenis_kelamin}\n\<br>
                            nilai seleksi\n\
                            1. soal keseluruhan : ${dataUse.total_soal}\n\<br>
                            2. soal diselesaikan : ${dataUse.total_selesai}\n\<br>
                            3. soal belum : ${dataUse.total_belum}\n\<br>
                            4. jawaban benar : ${dataUse.total_benar}\n\<br>
                            5. jawaban salah : ${dataUse.total_salah}\n\<br>
                            6. tanggal mulai : ${dataUse.tanggal_mulai}\n\<br>
                            7. tanggal selesai : ${dataUse.tanggal_akhir}\n\<br>
                            8. durasi penyelesaian : ${dataUse.totsl_durasi}\n\<br>
                            dari hasil count total score yang anda dapatkan ${dataUse.score}\n\
                            demikian yang dapat kami sampaikan, terikasih semuanya :) :)`
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