const { Sequelize, DataTypes } = require('sequelize')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('../model/Mequipment.js')
const formulir =  require('../model/Mformulir.js')
const Mapprove = require('../model/Mapprove.js')
const path = require('path')
const fs = require('fs')

module.exports = {
    getAllCheck : async (req, res, next) => {
        await formulir.findAll().
            then(async result => {
                const dataAll = result.map(el => {
                    return {
                        nama : el.nama,
                        alamat : el.jalan,
                        tempatLahir : el.tempat_lahir,
                        jenkel : el.jenis_kelamin,
                        datadiri : el.penerima_kps == "" ? 0 : 1,
                        dataalamat : el.jenis_tinggal == "" ? 0 : 1,
                        dataortu : el.pendidikan_ibu == "" ? 0 : 1,
                        datawali : el.pendidikan_wali == "" ? 0 : 1,
                        databerkas : el.foto_ijazah == "" ? 0 : 1,
                    }
                })
                res.status(201).json({
                    message: "Data success",
                    data: dataAll
                })
            }).catch(err => {
                console.log(err)
            })
    },

    getByToken : async (req, res, next) => {
        const kode = req.params.kode
        const formulirUse = await formulir.findOne({
            include: [
            {
                model: negara
            }, {
                model: provinsi
            }, {
                model: kabupaten
            }, {
                model: kecamatan
            }, {
                model: desa
            }],
            where: {
                token: kode,
            }
        }).
            then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Data Tidak Ditemukan",
                    })
                }
                res.status(201).json({
                    message: "Data Ditemukan",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
    },

    checkByToken : async (req, res, next) => {
        const kode =  req.params.kode
        const data = await formulir.findOne({where:{token:kode}})
        const diri = data.penerima_kps == "" ? 0 : 1
        const alamat = data.jenis_tinggal == "" ? 0 : 1
        const ortu = data.pendidikan_ibu == "" ? 0 : 1
        const wali = data.pendidikan_wali == "" ? 0 : 1
        const berkas = data.foto_ijazah == "" ? 0 : 1
        res.status(201).json({
            message: "Data success",
            data : [{
                nama : data.nama,
                foto : data.foto_diri,
                diri : diri,
                alamat : alamat,
                ortu : ortu,
                wali : wali,
                berkas : berkas
            }]
        })
    },

    createFirst : async (req, res, next) => {
        const kode =  req.params.kode
        await formulir.create({
            token : kode,
            no_kk: "",
            nik: "",
            no_kps: "",
            nisn: "",
            npwp: "",
            nama: "",
            tanggal_lahir: "",
            tempat_lahir: "",
            jenis_kelamin: "",
            penerima_kps : "",
            jalan: "",
            dusun: "",
            rt: "",
            rw: "",
            kode_pos: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            negara: "",
            alat_transportasi: "",
            jalur_pendaftaran: "",
            jenis_pendaftaran: "",
            jenis_tinggal: "",
            email: "",
            no_hp: "",
            no_telepon: "",
            nik_ayah: "",
            nama_ayah: "",
            tanggal_lahir_ayah: "",
            pekerjaan_ayah: "",
            penghasilan_ayah: "",
            pendidikan_ayah: "",
            nik_ibu: "",
            nama_ibu: "",
            tanggal_lahir_ibu: "",
            pekerjaan_ibu: "",
            penghasilan_ibu: "",
            pendidikan_ibu: "",
            nik_wali: "",
            nama_wali: "",
            tanggal_lahir_wali: "",
            pekerjaan_wali: "",
            penghasilan_wali: "",
            pendidikan_wali: "",
            foto_diri: "",
            foto_kk: "",
            foto_ktp: "",
            foto_ijazah: "",
            foto_kip: "",
        }).
            then(result => {
                res.status(201).json({
                    message: "Data Mahasiswa First success Ditambahkan",
                })
            }).
            catch(err => {
                console.log(err)
            })
    },
    
    form1 : async (req, res, next) => {
        const { nik, nama, no_kk, jenis_kelamin, tempat_lahir, tanggal, bulan, tahun, email, no_hp,
            no_telepon, nisn, no_kps, npwp,penerima_kps,
            jalur_pendaftaran, jenis_pendaftaran } = req.body
        const kode = req.params.kode
        const tanggal_lahir = tahun + "-" + bulan + "-" + tanggal
        const formulirUse = await formulir.findOne({
            where: {
                token: kode
            }
        })
        if (!formulirUse) return res.status(401).json({ message: "Data formulir tidak ditemukan" })
        await formulir.update({
            nik: nik,
            nama: nama,
            no_kk: no_kk,
            jenis_kelamin: jenis_kelamin,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            email: email,
            no_hp: no_hp,
            no_telepon: no_telepon,
            nisn: nisn,
            no_kps: no_kps,
            npwp: npwp,
            jalur_pendaftaran: jalur_pendaftaran,
            jenis_pendaftaran: jenis_pendaftaran,
            penerima_kps : penerima_kps,
        }, {
            where: {
                token: kode
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data formulir success di tambahkan form 1"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    form2 : async (req, res, next) => {
        const {jalan, dusun, rt, rw, kode_pos, negara,
            provinsi, kabupaten, kecamatan, desa, jenis_tinggal, alat_transportasi } = req.body
        const kode = req.params.kode
        const formulirUse = await formulir.findOne({
            where: {
                token: kode
            }
        })
        if (!formulirUse) return res.status(401).json({ message: "Data formulir tidak ditemukan" })
        await formulir.update({
            jalan: jalan,
            dusun: dusun,
            rt: rt,
            rw: rw,
            kode_pos: kode_pos,
            negara: negara,
            provinsi: provinsi,
            kabupaten: kabupaten,
            kecamatan: kecamatan,
            desa: desa,
            jenis_tinggal: jenis_tinggal,
            alat_transportasi: alat_transportasi,
        }, {
            where: {
                token: kode
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data formulir success di tambahkan form 2"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    form3 : async (req, res, next) => {
        const { nik_ayah, nama_ayah, pekerjaan_ayah, penghasilan_ayah, pendidikan_ayah, tanggal_a, bulan_a, tahun_a,
            nik_ibu, nama_ibu, pekerjaan_ibu, penghasilan_ibu, pendidikan_ibu, tanggal_b, bulan_b, tahun_b
        } = req.body
        const kode = req.params.kode
        const tanggal_lahir_ayah = tahun_a + "-" + bulan_a + "-" + tanggal_a
        const tanggal_lahir_ibu = tahun_b + "-" + bulan_b + "-" + tanggal_b

        const formulirUse = await formulir.findOne({
            where: {
                token: kode
            }
        })
        if (!formulirUse) return res.status(401).json({ message: "Data formulir tidak ditemukan" })
        await formulir.update({
            nik_ayah: nik_ayah,
            nama_ayah: nama_ayah,
            tanggal_lahir_ayah: tanggal_lahir_ayah,
            pekerjaan_ayah: pekerjaan_ayah,
            penghasilan_ayah: penghasilan_ayah,
            pendidikan_ayah: pendidikan_ayah,
            nik_ibu: nik_ibu,
            nama_ibu: nama_ibu,
            tanggal_lahir_ibu: tanggal_lahir_ibu,
            pekerjaan_ibu: pekerjaan_ibu,
            penghasilan_ibu: penghasilan_ibu,
            pendidikan_ibu: pendidikan_ibu,
        }, {
            where: {
                token: kode
            }
        }).
            then(result => {
                res.status(201).json({
                    message: "Data formulir success di tambahkan form 3"
                })
            }).
            catch(err => {
                next(err)
            })
    },

    form4 : async (req, res, next) => {
        const { nik_wali, nama_wali, pekerjaan_wali, penghasilan_wali, pendidikan_wali, tanggal_w, bulan_w, tahun_w,
            } = req.body
        const kode = req.params.kode
        const tanggal_lahir_wali = tahun_w + "-" + bulan_w + "-" + tanggal_w
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const formulirUse = await formulir.findOne({
            where: {
                token: kode
            }
        })
        if (!formulirUse) return res.status(401).json({ message: "Data formulir tidak ditemukan" })
        await formulir.update({
            nik_wali: nik_wali,
            nama_wali: nama_wali,
            tanggal_lahir_wali: tanggal_lahir_wali,
            pekerjaan_wali: pekerjaan_wali,
            penghasilan_wali: penghasilan_wali,
            pendidikan_wali: pendidikan_wali,
            tanggal_daftar : date
        }, {
            where: {
                token: kode
            }
        }).
        then(result => {
            res.status(201).json({
                message: "Data formulir success di tambahkan form 4"
            })
        }).
        catch(err => {
            next(err)
        })
    },

    formUpload : async (req, res, next) => {
        const kode = req.params.kode
        const formulirUse = await formulir.findOne({
            where: {
                token: kode
            }
        })
        if (!formulirUse) return res.status(401).json({ message: "Data formulir tidak ditemukan" })

        // ----------- foto diri ------------- //
        let fileNameFotoDiri = ""
        if (formulirUse.foto_diri === "") {
            const file = req.files.foto_diri
            if (!file) return res.status(400).json({ message: "foto diri tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoDiri = "foto_diri" + kode + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto diri yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto diri yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp_pmb/diri/${fileNameFotoDiri}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_diri
            if (!file) return res.status(400).json({ message: "foto diri tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoDiri = "foto_diri" + kode + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto diri yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto diri yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp_pmb/diri/${formulirUse.foto_diri}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp_pmb/diri/${fileNameFotoDiri}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto diri --------------//


        // ----------- foto kk ------------- //
        let fileNameFotoKK = ""
        if (formulirUse.foto_kk === "") {
            const file = req.files.foto_kk
            if (!file) return res.status(400).json({ message: "foto kk tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKK = "foto_kk"  + kode +file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto kk yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto kk yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp_pmb/kk/${fileNameFotoKK}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_kk
            if (!file) return res.status(400).json({ message: "foto kk tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKK = "foto_kk"  + kode + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto kk yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto kk yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp_pmb/kk/${formulirUse.foto_kk}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp_pmb/kk/${fileNameFotoKK}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        //  ---------------- end foto kk --------------//

        // //----------- foto ktp------------- //
        let fileNameFotoKtp = ""
        if (formulirUse.foto_ktp === "") {
            const file = req.files.foto_ktp
            if (!file) return res.status(400).json({ message: "foto ktp tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKtp = "foto_ktp" + kode + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ktp yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto ktp yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp_pmb/ktp/${fileNameFotoKtp}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_ktp
            if (!file) return res.status(400).json({ message: "foto ktp tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoKtp = "foto_ktp" + kode +file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ktp yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto ktp yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp_pmb/ktp/${formulirUse.foto_ktp}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp_pmb/ktp/${fileNameFotoKtp}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        //  ---------------- end foto ktp --------------//

        // //----------- foto ijazah------------- //
        let fileNameFotoIjazah = ""
        if (formulirUse.foto_ijazah === "") {
            const file = req.files.foto_ijazah
            if (!file) return res.status(400).json({ message: "foto ijazah tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoIjazah = "foto_ijazah" + kode + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ijazah yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file foto ijazah yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp_pmb/ijazah/${fileNameFotoIjazah}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.foto_ijazah
            if (!file) return res.status(400).json({ message: "foto ijazah tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            fileNameFotoIjazah = "foto_ijazah" + kode + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file foto ijazah yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file foto ijazah yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp_pmb/ijazah/${formulirUse.foto_ijazah}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp_pmb/ijazah/${fileNameFotoIjazah}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }
        // ---------------- end foto ijazah --------------//
        try {
            await formulir.update({
                foto_diri: fileNameFotoDiri,
                foto_kk: fileNameFotoKK,
                foto_ktp: fileNameFotoKtp,
                foto_ijazah: fileNameFotoIjazah,
            }, {
                where: {
                    token: kode
                }
            })
            
            await Mapprove.update({
                status_formulir : "selesai"
            }, {
                where : {
                    token : kode
                }
            }).then(result => {
                res.status(200).json({ 
                    message: "Data file formulir berhasil ditambahkan" 
                })
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

}