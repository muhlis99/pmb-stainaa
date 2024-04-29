const {Sequelize,Op} =  require('sequelize')
const pembayaran = require('../model/Mpembayaran.js')
const transaksi =  require('../model/Mtransaksi.js')
const formulir = require('../model/Mformulir.js')
const Mapprove = require('../model/Mapprove.js')
const path = require('path')
const fs = require('fs')


module.exports = {
    getAllByToken : async (req, res, next) => {
        const kode = req.params.kode
        await transaksi.findAll({
            include : [
                {
                    model : formulir,
                    attributes : ["nama", "tanggal_lahir","email"]
                },
                {
                    model : pembayaran
                }
            ],
            where: {
                token : kode
            },
            order: [
                ["id_transaksi", "DESC"]
            ]
        }).
            then(result => {
                res.status(200).json({
                    message: "Get All transaksi Success",
                    data: result,
                })
            }).
            catch(err => {
                console.log(err)
            })
    },

    getById : async (req, res, next) => {
        const id = req.params.id
        await transaksi.findOne({
            where: {
                id_transaksi: id,
            }
        }).
            then(getById => {
                if (!getById) {
                    return res.status(404).json({
                        message: "Data transaksi Tidak Ditemukan",
                        data: null
                    })
                }
                res.status(201).json({
                    message: "Data transaksi Ditemukan",
                    data: getById
                })
            }).
            catch(err => {
                next(err)
            })
    },

    getTotalPembayaran : async (req, res, next) => {
        const kode = req.params.kode
        const date =  new Date().getFullYear()
        const data = await formulir.findOne({where:{token:kode}})
        const totalPembayaran = await pembayaran.findOne({
            where:{
                tahun:date,
                status : "aktif"
            }
        })
        const jumlahBayar = await transaksi.sum("nominal",{where:{token:kode}})
        let status = ""
        if (jumlahBayar === null ) {
            status = "belum bayar"
        } else if (totalPembayaran.jumlah_pembayaran <= jumlahBayar) {
            status = "lunas"
        } else if (totalPembayaran.jumlah_pembayaran > jumlahBayar ) {
            status = "belum lunas"
        }
        res.status(201).json({
            message : "data success",
            data : [{
                transaksi : [{
                    nama : data.nama,
                    email : data.email,
                    jenkel : data.jenis_kelamin
                }],
                statusPembayaran : status,
                jumlahBayar : jumlahBayar,
                pembayaran : totalPembayaran
            }]
        })

    },

    getBuktiPendaftaran : async (req, res, next) => {
        const kode = req.params.kode
        const data = await transaksi.count({where:{token:kode}})
        const status = data > 0 ? "sudah" : "belum"
        res.status(201).json({
            message : "data success",
            data : status
        })
    },

    tenggatPembayaranHabis : async (req, res, next) => {
        const id = req.params.id
        const dataUse = await transaksi.findOne({where:{id_transaksi:id}})
        const date = new Date().toLocaleDateString('en-CA')
        const tenggat_pembayaran = dataUse.tenggat_pembayaran
        if (date >= tenggat_pembayaran) {
            await transaksi.update({
                status_tombol : "1",
                status_transaksi : "selesai"
            }).then(result => {
                res.status(201).json({
                    message: "Data transaksi success",
                    data: result
                })
            }).
            catch(err => {
                next(err)
            })
        }
    },
    
    tambah : async (req, res, next) => {
        let now = new Date();
        let nextDay = new Date(now.setDate(now.getDate() + 7))
        const tenggat = nextDay.toLocaleDateString('en-CA') 
        const {kode,id_pembayaran} = req.body
        await transaksi.create({
            kode_transaksi : "",
            id_pembayaran : id_pembayaran,
            token : kode,
            pembayaran_ke : "1",
            nominam : "000",
            tanggal_transaksi : "",
            tenggat_pembayaran : tenggat,
            bukti_transaksi : "",
            status_tombol : "0",
            status_transaksi : "belum"
        }).then(result => {
            res.status(201).json({
                message: "Data transaksi success",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    tambahAnsuran : async (req, res, next) => {
        const {kode,id_pembayaran, tanggal_transaksi, pembayaran_ke} = req.body
        let now = new Date(tanggal_transaksi);
        let nextDay = new Date(now.setDate(now.getDate() + 7))
        const tenggat = nextDay.toLocaleDateString('en-CA') 
        await transaksi.create({
            kode_transaksi : "",
            id_pembayaran : id_pembayaran,
            token : kode,
            pembayaran_ke : pembayaran_ke,
            nominam : "000",
            tanggal_transaksi : "",
            tenggat_pembayaran : tenggat,
            bukti_transaksi : "",
            status_tombol : "0",
            status_transaksi : "belum"
        }).then(result => {
            res.status(201).json({
                message: "Data transaksi success",
                data: result
            })
        }).
        catch(err => {
            next(err)
        })
    },

    tambahTransaksi : async (req, res, next) => {
        const id = req.params.id
        let randomNumber = Math.floor(100000000000 + Math.random() * 900000000000)
        const transaksiUse = await transaksi.findOne({where:{id_transaksi:id}})
        if(!transaksiUse) return res.status(401).json({message:"data nout found"})
        const {nominal, tanggal_transaksi} = req.body

        let buktiTransaksi = ""
        if (transaksiUse.bukti_transaksi === "") {
            const file = req.files.bukti_transaksi
            if (!file) return res.status(400).json({ message: "bukti transaksi tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            buktiTransaksi = "bukti_transaksi" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file bukti transaksi yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ msg: "file bukti transaksi yang anda upload tidak boleh lebih dari 5 mb" })
            file.mv(`./tmp_pmb/transaksi/${buktiTransaksi}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        } else {
            const file = req.files.bukti_transaksi
            if (!file) return res.status(400).json({ message: "bukti transaksi tidak boleh kosong" })
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            buktiTransaksi = "bukti_transaksi" + id + file.md5 + ext
            const allowedType = ['.png', '.jpg', '.jpeg']
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "file bukti transaksi yang anda upload tidak valid" })
            if (fileSize > 5000000) return res.status(422).json({ message: "file bukti transaksi yang anda upload tidak boleh lebih dari 5 mb" })
            const filepath = `./tmp_pmb/transaksi/${transaksiUse.bukti_transaksi}`
            fs.unlinkSync(filepath)
            file.mv(`./tmp_pmb/transaksi/${buktiTransaksi}`, (err) => {
                if (err) return res.status(500).json({ message: err.message })
            })
        }

        const date =  new Date().getFullYear()
        const totalPembayaran = await pembayaran.findOne({
            where:{
                tahun:date,
                status :"aktif"
            }
        })
        const jumlahBayar = await transaksi.sum("nominal",{where:{token:transaksiUse.token}}) 
        const totalJumlahBayarMHs = parseFloat(jumlahBayar) + parseFloat(nominal)
        if (totalPembayaran.jumlah_pembayaran <= totalJumlahBayarMHs) {
            await Mapprove.update({
                status_pembayaran : "selesai"
            }, {
                where : {
                    token : transaksiUse.token
                }
            })
        }
        try {
            await transaksi.update({
                bukti_transaksi: buktiTransaksi,
                kode_transaksi: randomNumber,
                nominal: nominal,
                tanggal_transaksi: tanggal_transaksi,
                status_tombol : "1",
                status_transaksi : "selesai"
            }, {
                where: {
                    id_transaksi: id
                }
            })
                .then(result => {
                    res.status(200).json({ message: "Data transaksi berhasil ditambahkan" })
                }).catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    },

    checkTransaksi : async (req, res, next) => {
        const kode = req.params.kode
        const date =  new Date().getFullYear()
        const data = await formulir.findOne({where:{token:kode}})
        const totalPembayaran = await pembayaran.findOne({
            where:{
                tahun:date,
                status : "aktif"
            }
        })
        const jumlahBayar = await transaksi.sum("nominal",{where:{token:kode}})
        let status = ""
        if (jumlahBayar === null ) {
            status = "belum bayar"
        } else if (totalPembayaran.jumlah_pembayaran <= jumlahBayar) {
            status = "lunas"
        } else if (totalPembayaran.jumlah_pembayaran > jumlahBayar ) {
            status = "belum lunas"
        }
        res.status(200).json({ 
            message: "Data transaksi berhasil ditambahkan",
            status : status 
        })
    },

    editTenggatPembayaran : async (req, res, next) => {
        const id = req.params.id
        const {tombol, tenggat} = req.body
        const dataUse = await transaksi.findOne({where : {id_transaksi:id}})
        if(!dataUse) return res.json({message:"data not found"})
        await transaksi.update({
            tenggat_pembayaran : tenggat,
            status_tombol : tombol
        }, {
            where : {
                id_transaksi : id
            }
        }).then(result => {
            res.status(201).json({
                message: "Data transaksi success"
            })
        }).
        catch(err => {
            console.log(err)
        })
    }
}