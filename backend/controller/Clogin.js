const user = require('../model/Mregistrasi.js')
const argon = require('argon2')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = {
    login: async (req, res, next) => {
        const userUse = await user.findOne({
            where: {
                email: req.body.email,
                status: "aktif"
            }
        })
        if (!userUse) return res.status(401).json({ message: "data tidak ditemukan" })
        const verfiyPass = await argon.verify(userUse.password, req.body.password)
        if (!verfiyPass) return res.status(400).json({ message: "password salah" })
        req.session.userId = userUse.id_pmb
        const id = userUse.id_pmb
        const email = userUse.email
        const role = userUse.role
        const token = userUse.token
        res.status(200).json({
            message: "login suksess",
            id, email, role, token
        })
    },

    me: async (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Mohon login menggunakan akun anda"
            })
        }
        const userUse = await user.findOne({
            attributes: ["id_pmb", "email","token","role"],
            where: {
                id_pmb: req.session.userId,
                status: "aktif"
            }
        })
        if (!userUse) return res.status(404).json({ message: "user tidak ditemukan" })
        res.status(200).json({ message: "selamat datang", data: userUse })
    },

    logout: async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) return res.status(400).json({ message: "Tidak dapat logout" })
                res.status(200).json({ message: "Anda telah logout" })
            })
        } catch (err) {
            next(err)
        }
    },

    forgot: async (req, res, next) => {
        const email = req.body.email
        let randomNumber = Math.floor(100000 + Math.random() * 900000)
        const emailUse = await user.findOne({
            where: {
                email: email,
                status: "aktif"
            }
        })
        if (!emailUse) return res.status(404).json({ message: "Tidak dapat menemukan akun email anda" })
            res.status(200).json({
                message: "Email anda ditemukan",
                email : email,
                token : emailUse.token
            })
        // let testAccount = await nodemailer.createTestAccount()
        // let transporter = nodemailer.createTransport(smtpTransport({
        //     service: "gmail",
        //     auth: {
        //         user: "stainaabanyuwangi@gmail.com",
        //         pass: "kmmo hoed yaop gekt",
        //     }
        // }))

        // try {
        //     await user.update({
        //         verifikasi_kode: randomNumber,
        //     }, {
        //         where: {
        //             email: email,
        //             status: "aktif"
        //         }
        //     }).
        //         then(result => {
        //             res.status(201).json({
        //                 message: "code verifikasi telah terkirim"
        //             })
        //         })

        //     await transporter.sendMail({
        //         from: 'stainaabanyuwangi@gmail.com',
        //         to: `${email}`,
        //         subject: "kode verifikasi pmb stainaa",
        //         text: 'jangan disebarakan pada orang lain',
        //         html: `<div class="card" style="width: 60%;>
        //                     <div class="card-body">
        //                         <h5 class="card-title">Silakan masukkan kode verifikasi di bawah ini untuk mereset password anda
        //                         jangan berikan kode verifikasi ini kepada siapapun</h5>
        //                         <h3 style="color:blue" class="card-text">${randomNumber}</h3>
        //                         <h6>Catatan :<br>
        //                         1. Kode ini dikirim oleh server PMB STAINAA.<br>
        //                         2. Abaikan jika anda merasa tidak melakukannya.<br>
        //                         3. Pesan ini dikirim menggunakan email otomatis, mohon untuk tidak membalas email ini.
        //                         </h6>
        //                         <hr>
        //                         <h6>banyuwangi, ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} WIB <br>
        //                         Sekolah Tinggi Agama Islam Nurul Abror Al-Robbaniyin <br>
        //                         jl. KH Agus Salim No 165 68453 email : muhlis_ganteng@gmail.com</h6>
        //                     </div>
        //                 </div>`
        //     })

        // } catch (err) {
        //     console.log(err);
        // }
    },

    verifyCode: async (req, res, next) => {
        const code = req.body.code
        const codeUse = await user.findOne({
            where: {
                verifikasi_kode: code,
                status: "aktif"
            }
        })
        if (!codeUse) return res.status(404).json({ message: "data tidak ditemukan" })
        try {
            await user.update({
                verifikasi_kode: ""
            }, {
                where: {
                    id_pmb: codeUse.id_pmb,
                    status: "aktif"
                }
            })
            req.session.userId = codeUse.id_pmb
            const id = codeUse.id_pmb
            const email = codeUse.email
            const role = codeUse.role
            const token = codeUse.token
            res.status(200).json({
                message: "",
                id, email, role, token
            })
        } catch (err) {
            next(err)
        }
    },

    resetPasswordByForgot: async (req, res, next) => {
        const kode = req.params.id
        const userUse = await user.findOne({
            where: {
                id_pmb: kode,
                status: "aktif"
            }
        })
        if(!userUse) return res.status(402).json({message:"data not found"})
        const {pass, conPass} = req.body
        if (pass != conPass) return res.status(400).json({ message: "confirmasi password yang anda masukkan salah" })
        const hashPass =  await argon.hash(pass)
        await user.update({
            password: hashPass,
        }, {
            where: {
                id_pmb: kode,
                status: "aktif"
            }
        })
        req.session.userId = userUse.id_pmb
        const id = userUse.id_pmb
        const email = userUse.email
        const role = userUse.role
        const token = userUse.token
        res.status(200).json({
            message: "reset password anda telah berhasil",
            id, email, role, token
        })
    }
}