const Mapprove =  require('../model/Mapprove.js')
const Mformulir = require('../model/Mformulir.js')
const Mmahasiswa = require('../model/mahasiswaModel.js')
const MhistoryMhs = require('../model/historyMahasiswaModel.js')
const Mprodi = require('../model/Mprodi.js')
const MseleksiProdi = require('../model/MseleksiProdi.js')
const Msemester = require('../model/semesterModel.js')
const MloginMhs = require('../model/loginModel.js')
const MtahunAjaran = require('../model/tahunAjaranModel.js')
const Mregistrasi = require('../model/Mregistrasi.js')
const {Sequelize,Op} =  require('sequelize')
const argon = require('argon2')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const path = require('path')
const fs = require('fs')
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

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
            include : [{
                model : Mformulir,
                attributes : ["nama","tanggal_lahir", "tempat_lahir","email"]
            }],
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

    getAllTahunAjaran : async (req, res, next) => {
        await MtahunAjaran.findAll().
        then(result => {
            res.status(201).json({
                message: "Data tahun ajaran Ditemukan",
                data: result
            })
        }).
        catch(err => {
            console.log(err)
        })
    },

    getAllSemester : async (req, res, next) => {
        const kode = req.params.kode
        await Msemester.findAll({
            where : {
                code_tahun_ajaran : kode,
                status : "aktif"
            }
        }).
        then(result => {
            res.status(201).json({
                message: "Data semester Ditemukan",
                data: result
            })
        }).
        catch(err => {
            console.log(err)
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
        async function createQrCode(dataForQRcode, center_image, width, cwidth) {
            const canvas = createCanvas(width, width)
            QRCode.toCanvas(
                canvas,
                dataForQRcode,
                {
                    errorCorrectionLevel: "H",
                    width: 500,
                    margin: 1,
                    color: {
                        dark: "#000000",
                        light: "#ffffff",
                    },
                }
            )

            const ctx = canvas.getContext("2d")
            const img = await loadImage(center_image)
            const center = (width - cwidth) / 1
            ctx.drawImage(img, 200, 190, cwidth, cwidth)
            return canvas.toDataURL("image/png")
        }

        async function mainQrCode(nim, params, qrCodeOld = "") {
            if (qrCodeOld) {
                const data = params
                const centerImageBase64 = fs.readFileSync(
                    path.resolve('./stainaa.png')
                )
                const dataQrWithLogo = Buffer.from(centerImageBase64).toString('base64url')
                const qrCode = await createQrCode(
                    nim,
                    `data:image/png;base64,${dataQrWithLogo}`,
                    150,
                    100
                )
                const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
                fs.unlinkSync(`./tmp_siakad/mahasiswa/qrcode/${qrCodeOld}`)
                let filename = `./tmp_siakad/mahasiswa/qrcode/${data}.png`;
                fs.writeFile(filename, base64Data, "base64url", (err) => {
                    if (!err) console.log(`${filename} created successfully!`)
                })
            } else {
                const data = params
                const centerImageBase64 = fs.readFileSync(
                    path.resolve('./stainaa.png')
                )
                const dataQrWithLogo = Buffer.from(centerImageBase64).toString('base64url')
                const qrCode = await createQrCode(
                    nim,
                    `data:image/png;base64,${dataQrWithLogo}`,
                    150,
                    100
                )
                const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
                let filename = `./tmp_siakad/mahasiswa/qrcode/${data}.png`;
                fs.writeFile(filename, base64Data, "base64url", (err) => {
                    if (!err) console.log(`${filename} created successfully!`)
                })
            }
        }
        
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const {token, semester} = req.body
        const date = new Date().toLocaleDateString('en-CA')
        await Mapprove.update({
            tanggal_approve : date,
            status : "setuju"
        }, {
            where : {
                token : token
            }
        })
        const dataSemester = await Msemester.findOne({where:{id_semester:semester}})
        const dataSeleksiProdi = await MseleksiProdi.findOne({where:{token:token}})
        const dataProdi = await Mprodi.findOne({where : {id_prodi : dataSeleksiProdi.prodi_seleksi_admin}})
        const dataMhs = await Mformulir.findOne({where:{token:token}})

        const dateM = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const date_nim = new Date()
        const t_nim = date_nim.getFullYear().toString().substr(-2)
        // const b_nim = ("0" + (date_nim.getMonth() + 1)).slice(-2)
        const b_nim = "09"
        let  kode_prodi_nim = ""
        if (dataProdi.code_prodi == "S1FAIPAI") {
            kode_prodi_nim = "01"
        }
        else if (dataProdi.code_prodi == "S1FMUHES") {
            kode_prodi_nim = "02"
        }
        else {
            kode_prodi_nim = "00"
        }
        const no_urut_mhs_terakhir = await Mmahasiswa.count({
            where: {
                tanggal_masuk_kuliah: {
                    [Op.substring]: date_nim.getFullYear()
                }
            }
        })

        let nim
        let dataQrCode
        if (no_urut_mhs_terakhir == null) {
            no_urut_mhs = "0001"
            nim = t_nim + b_nim + kode_prodi_nim + no_urut_mhs
            dataQrCode = "mahasiswaQrcode" + Buffer.from(nim).toString('base64url')
            mainQrCode(nim, dataQrCode)
        } else {
            const code = "0000"
            const a = no_urut_mhs_terakhir.toString()
            const panjang = a.length
            const nomor = code.slice(panjang)
            const b = (no_urut_mhs_terakhir + 1)
            no_urut_mhs = nomor + b
            nim = t_nim + b_nim + kode_prodi_nim + no_urut_mhs
            dataQrCode = "mahasiswaQrcode" + Buffer.from(nim).toString('base64url')
            mainQrCode(nim, dataQrCode)
        }

        const filefotodiriold = `./tmp_pmb/diri/${dataMhs.foto_diri}`;
        const filefotodirinew = `./tmp_siakad/mahasiswa/diri/${dataMhs.foto_diri}`;
        fs.copyFile(filefotodiriold, filefotodirinew, (err) => {
            if (err) {
                console.log("Error Found:", err);
            }
        })

        const filefotoijazahold = `./tmp_pmb/ijazah/${dataMhs.foto_ijazah}`;
        const filefotoijazahnew = `./tmp_siakad/mahasiswa/ijazah/${dataMhs.foto_ijazah}`;
        fs.copyFile(filefotoijazahold, filefotoijazahnew, (err) => {
            if (err) {
                console.log("Error Found:", err);
            }
        })

        const filefotokkold = `./tmp_pmb/kk/${dataMhs.foto_kk}`;
        const filefotokknew = `./tmp_siakad/mahasiswa/kk/${dataMhs.foto_kk}`;
        fs.copyFile(filefotokkold, filefotokknew, (err) => {
            if (err) {
                console.log("Error Found:", err);
            }
        })

        const filefotoktpold = `./tmp_pmb/ktp/${dataMhs.foto_ktp}`;
        const filefotoktpnew = `./tmp_siakad/mahasiswa/ktp/${dataMhs.foto_ktp}`;
        fs.copyFile(filefotoktpold, filefotoktpnew, (err) => {
            if (err) {
                console.log("Error Found:", err);
            }
        })

        await Mmahasiswa.create({
            nim: nim,
            no_kk: dataMhs.no_kk,
            nik: dataMhs.nik,
            no_kps: dataMhs.no_kps,
            nisn: dataMhs.nisn,
            npwp: dataMhs.npwp,
            nama: dataMhs.nama,
            tanggal_lahir: dataMhs.tanggal_lahir,
            tempat_lahir: dataMhs.tempat_lahir,
            jenis_kelamin: dataMhs.jenis_kelamin,
            jalan: dataMhs.jalan,
            dusun: dataMhs.dusun,
            rt: dataMhs.rt,
            rw: dataMhs.rw,
            kode_pos: dataMhs.kode_pos,
            desa: dataMhs.desa,
            kecamatan: dataMhs.kecamatan,
            kabupaten: dataMhs.kabupaten,
            provinsi: dataMhs.provinsi,
            negara: dataMhs.negara,
            alat_transportasi: dataMhs.alat_transportasi,
            jalur_pendaftaran: dataMhs.jalur_pendaftaran,
            jenis_pendaftaran: dataMhs.jenis_pendaftaran,
            jenis_tinggal: dataMhs.jenis_tinggal,
            penerima_kps: dataMhs.penerima_kps,
            code_semester: dataSemester.code_semester,
            code_tahun_ajaran : dataSemester.code_tahun_ajaran,
            tanggal_masuk_kuliah: dateM,
            email: dataMhs.email,
            no_hp: dataMhs.no_hp,
            no_telepon: dataMhs.no_telepon,
            nik_ayah: dataMhs.nik_ayah,
            nama_ayah: dataMhs.nama_ayah,
            tanggal_lahir_ayah: dataMhs.tanggal_lahir_ayah,
            pekerjaan_ayah: dataMhs.pekerjaan_ayah,
            penghasilan_ayah: dataMhs.penghasilan_ayah,
            pendidikan_ayah: dataMhs.pendidikan_ayah,
            nik_ibu: dataMhs.nik_ibu,
            nama_ibu: dataMhs.nama_ibu,
            tanggal_lahir_ibu: dataMhs.tanggal_lahir_ibu,
            pekerjaan_ibu: dataMhs.pekerjaan_ibu,
            penghasilan_ibu: dataMhs.penghasilan_ibu,
            pendidikan_ibu: dataMhs.pendidikan_ibu,
            nik_wali: dataMhs.nik_wali,
            nama_wali: dataMhs.nama_wali,
            tanggal_lahir_wali: dataMhs.tanggal_lahir_wali,
            pekerjaan_wali: dataMhs.pekerjaan_wali,
            penghasilan_wali: dataMhs.penghasilan_wali,
            pendidikan_wali: dataMhs.pendidikan_wali,
            code_jenjang_pendidikan: dataProdi.code_jenjang_pendidikan,
            code_fakultas: dataProdi.code_fakultas,
            code_prodi: dataProdi.code_prodi,
            qrcode: dataQrCode + ".png",
            foto_diri: dataMhs.foto_diri,
            foto_kk: dataMhs.foto_kk,
            foto_ktp: dataMhs.foto_ktp,
            foto_ijazah: dataMhs.foto_ijazah,
            foto_kip: "",
            status: "aktif",
        })

        const hashPassword = await argon.hash(nim)
        await MloginMhs.create({
            username: nim,
            email: dataMhs.email,
            password: hashPassword,
            role: "mahasiswa",
            verify_code: "",
            status: "aktif"
        })

        await MhistoryMhs.create({
            code_history: randomNumber +  dataSemester.code_semester,
            nim: nim,
            code_semester: dataSemester.code_semester,
            code_tahun_ajaran : dataSemester.code_tahun_ajaran,
            code_jenjang_pendidikan: dataProdi.code_jenjang_pendidikan,
            code_fakultas: dataProdi.code_fakultas,
            code_prodi: dataProdi.code_prodi,
            status: "aktif"
        }).then(async result => {
            await Mregistrasi.update({
                status : "tidak"
            }, {
                where : {
                    token : token
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
                to: `${dataMhs.email}`,
                subject: "Pengumuman",
                text: 'jangan disebarakan pada orang lain',
                html: `<div class="card" style="width: 60%;>
                            <div class="card-body">
                                <h5class="card-title">Pengumuman seleksi.</h5>
                                <h2>selamat anda berhasil melakukan registrasi pendaftaran<h2>
                                <h3>nim anda berupa<h3><h3>${nim}</h3><br>
                                <h3>nim anda digunakan untuk login ke aplikasi siamdos.siakad.ac.id
                                apabila tidak bisa login silahkan menghubungi tim IT STAINAA <h3>
                                <h6><br>
                                1. kode ini dikirim oleh server PMB STAINAA.<br>
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
                message: "Data approve success",
            })
        }).catch(err => {
            console.log(err);
        })
    }
}