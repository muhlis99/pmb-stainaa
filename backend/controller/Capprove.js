const Mapprove =  require('../model/Mapprove.js')
const Mformulir = require('../model/Mapprove.js')
const {Sequelize,Op} =  require('sequelize')
const argon = require('argon2')
const nodemailer = require('nodemailer')


module.exports = {
    getAll : async (req, res, next) => {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10
        const search = req.query.search || ""
        const offset = (currentPage - 1) * perPage
        const totalPage = await Mapprove.count({
            where: {
                [Op.or]: [
                    {
                        id_approve: {
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
        await Mapprove.findAll({
            where: {
                [Op.or]: [
                    {
                        id_approve: {
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
                ["id_approve", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All Mapprove Success",
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
        await Mapprove.findOne({
            where: {
                id_approve: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data Mapprove Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data Mapprove Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    approve : async (req, res, next) => {
        const {token, prodi} = req.body
        const date = new Date().toLocaleDateString('en-CA')
        await Mapprove.update({
            tanggal_approve : date,
            status : "setuju"
        })

        // const dataMhs = await 
    },
    
    daftar : async (req, res, next) => {
        const {nama, email, pass, conPass} = req.body
        if (pass != conPass) return res.status(400).json({ message: "confirmasi password yang anda masukkan salah" })
        const hashPass =  await argon.hash(pass)
        await Mapprove.create({
            nama : nama,
            email : email,
            password : hashPass,
            role : "user",
            verivikasi_kode : "",
            status : "aktif"
        }).then(async result => {
            let randomNumber = Math.floor(100000 + Math.random() * 900000)
            await Mapprove.update({
                verifikasi_kode : randomNumber
            }, {
                where : {
                    id_pmb : result.id_pmb
                }
            })
            let testAccount = await nodemailer.createTestAccount()
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "muhammadbwi13@gmail.com",
                    pass: "xzhltcpsznbllacw",
                }
            })
            await transporter.sendMail({
                from: 'muhammadbwi13@gmail.com',
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
                message: "Data Mapprove Ditemukan",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    }
}