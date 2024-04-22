const user = require('../model/Mregistrasi.js')
const argon = require('argon2')
const nodemailer = require('nodemailer')

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
        res.status(200).json({
            message: "login suksess",
            id, email, role
        })
    },

    me: async (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Mohon login menggunakan akun anda"
            })
        }
        const userUse = await user.findOne({
            attributes: ["id_pmb", "email", "role"],
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
        let testAccount = await nodemailer.createTestAccount()
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "muhammadbwi13@gmail.com",
                pass: "xzhltcpsznbllacw",
            }
        })

        try {
            await user.update({
                verifikasi_reset_password: randomNumber,
            }, {
                where: {
                    email: email,
                    status: "aktif"
                }
            }).
                then(result => {
                    res.status(201).json({
                        message: "code verifikasi telah terkirim"
                    })
                })

            await transporter.sendMail({
                from: 'muhammadbwi13@gmail.com',
                to: `${email}`,
                subject: "Atur Ulang Kata Kunci Apliaksi Mahasiswa STAINAA",
                text: 'jangan disebarakan pada orang lain',
                html: `<div class="card" style="width: 60%;>
                            <div class="card-body">
                                <h5 class="card-title">Atur ulang kata kunci tinggal selangkah lagi.
                                Silahkan masukkan nomor dibawah ini untuk mengatur ulang kata kunci Anda; </h5>
                                <h3 style="color:blue" class="card-text">${randomNumber}</h3>
                                <h6>Catatan :<br>
                                1. ini adalah email yang dikirim oleh server STAINAA atas permintaan anda ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} WIB
                                    untuk mengatur ulang kata kunci pada aplikasi SIAKAD STAINAA.<br>
                                2. Abaikan email ini jika anda merasa tidak melakukannya.<br>
                                3. ini adalah email otomatis, mohon tidak membalas email ini</h6>
                                <hr>
                                <h6>banyuwangi, ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} WIB <br>
                                Sekolah Tinggi Agama Islam Nurul Abror Al-Robbaniyin <br>
                                jl. KH Agus Salim No 165 68453 email : muhlis_ganteng@gmail.com</h6>
                            </div>
                        </div>`
            })

        } catch (err) {
            console.log(err);
            // next(err)
        }
    },

    verifyCode: async (req, res, next) => {
        const code = req.body.code
        const codeUse = await user.findOne({
            where: {
                verifikasi_reset_password: code,
                status: "aktif"
            }
        })
        if (!codeUse) return res.status(404).json({ message: "data tidak ditemukan" })
        try {
            await user.update({
                verify_code: ""
            }, {
                where: {
                    id: codeUse.id,
                    status: "aktif"
                }
            })
            req.session.userId = codeUse.id_pmb
            const id = codeUse.id_pmb
            const email = codeUse.email
            const role = codeUse.role
            res.status(200).json({
                message: "",
                id, email, role
            })
        } catch (err) {
            next(err)
        }
    },

    resetPasswordByForgot: async (req, res, next) => {
        const id = req.params.id
        const { newPassword } = req.body
        const hashPassword = await argon.hash(newPassword)
        await user.update({
            password: hashPassword,
        }, {
            where: {
                id_pmb: id,
                status: "aktif"
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "reset password anda telah berhasil"
                })
            })
    }
}