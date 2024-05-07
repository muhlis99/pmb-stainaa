const registrasi =  require('../model/Mregistrasi.js')
const Mapprove = require('../model/Mapprove.js')
const {Sequelize,Op} =  require('sequelize')
const argon = require('argon2')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = {
    getAll : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await registrasi.count({
            where: {
                [Op.or]: [
                    {
                        id_pmb: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        token: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        })
        const totalItems = Math.ceil(totalPage / perPage)
        await registrasi.findAll({
            where: {
                [Op.or]: [
                    {
                        id_pmb: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        token: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        nama: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            offset: offset,
            limit: perPage,
            order: [
                ["id_pmb", "DESC"]
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

    getById : async (req, res, next) => {
        const id = req.params.id
        await registrasi.findOne({
            where: {
                id_pmb: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data registrasi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data registrasi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },
    
    daftar : async (req, res, next) => {
        const {nama, email, pass, conPass} = req.body
        if (pass != conPass) return res.status(400).json({ message: "confirmasi password yang anda masukkan salah" })
        const hashPass =  await argon.hash(pass)
        await registrasi.create({
            nama : nama,
            email : email,
            password : hashPass,
            role : "user",
            verivikasi_kode : "",
            status : "aktif"
        }).then(async result => {
            let randomNumber = Math.floor(100000 + Math.random() * 900000)
            await registrasi.update({
                verifikasi_kode : randomNumber
            }, {
                where : {
                    id_pmb : result.id_pmb
                }
            })
            let testAccount = await nodemailer.createTestAccount()
            let transporter = nodemailer.createTransport(smtpTransport({
                service: "gmail",
                auth: {
                    user: "stainaabanyuwangi@gmail.com",
                    pass: "kmmo hoed yaop gekt",
                }
            }))
            await transporter.sendMail({
                from: 'stainaabanyuwangi@gmail.com',
                to: `${email}`,
                subject: "Atur Ulang Kata Kunci Apliaksi Mahasiswa STAINAA",
                text: 'jangan disebarakan pada orang lain',
                html: `<div class="card" style="width: 60%;>
                            <div class="card-body">
                                <h5 class="card-title">Tinggal satu langkah lagi
                                Silakan masukkan kode verifikasi di bawah ini, untuk melanjutkan pendaftaran PMB STAINAA
                                Kode ini jangan diberikan kepada siapapun.</h5>
                                <h3 style="color:blue" class="card-text">${randomNumber}</h3>
                                <h6><br>
                                1. Kode ini dikirim oleh server PMB STAINAA.<br>
                                2. Abaikan jika anda merasa tidak melakukannya.<br>
                                3. Pesan ini dikirim menggunakan email otomatis, mohon untuk tidak membalas email ini.</h6>
                                <hr>
                                <h6>banyuwangi, ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} WIB <br>
                                Sekolah Tinggi Agama Islam Nurul Abror Al-Robbaniyin <br>
                                jl. KH Agus Salim No 165 68453 email : muhlis_ganteng@gmail.com</h6>
                            </div>
                        </div>`
            })
            res.status(201).json({
                message: "Data registrasi Ditemukan",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    verifikasi : async (req, res, next) => {
        const {kode} = req.body
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        if(kode.length < 6)return res.status(404).json({message: "kode yang anda masukkan kurang 6 digit"})
        const dataPost = await registrasi.findOne({
            where: {
                verifikasi_kode: kode,
            }
        })
        if (!dataPost) {
            return res.status(404).json({
                message: "kode yang anda masukkan salah"
            })
        }
        await registrasi.update({
            token : randomNumber,
            verifikasi_kode : ""
        }, {
            where : {
                verifikasi_kode : kode
            }
        })

        await Mapprove.create({
            token : randomNumber,
            status_formulir : "belum",
            status_pembayaran : "belum",
            status_seleksi : "belum",
            tanggal_approve : "",
            status : "tidak"
        })

        req.session.userId = dataPost.id_pmb
        const id = dataPost.id_pmb
        const email = dataPost.email
        const role = dataPost.role
        const token =  randomNumber
        res.status(200).json({
            message: "login suksess",
            id, email, role, token
        })
    }
}