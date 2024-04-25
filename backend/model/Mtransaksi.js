const { Sequelize, DataTypes } = require('sequelize')
const formulir =  require('./Mformulir.js')
const pembayaran = require('./Mpembayaran.js')
const db = require('../config/database.js')

const transaksi = db.define('transaksi', {
    'id_transaksi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'kode_transaksi': {
        type: DataTypes.TEXT,
    },
    'id_pembayaran': {
        type: DataTypes.TEXT
    },
    'token': {
        type: DataTypes.TEXT
    },
    'pembayaran_ke': {
        type: DataTypes.TEXT
    },
    'tanggal_transaksi': {
        type: DataTypes.TEXT
    },
    'tenggat_pembayaran': {
        type: DataTypes.TEXT
    },
    'nominal': {
        type: DataTypes.TEXT
    },
    'bukti_transaksi': {
        type: DataTypes.TEXT
    },
    'status_tombol': {
        type: DataTypes.ENUM,
        values: ['1','0']
    }
}, {
    tableName: 'tb_pmb_transaksi_pembayaran',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

formulir.belongsTo(transaksi, { foreignKey: 'token' })
transaksi.hasMany(formulir, { sourceKey: 'token', foreignKey: 'token' })
pembayaran.belongsTo(transaksi, { foreignKey: 'id_pembayaran' })
transaksi.hasMany(pembayaran, { sourceKey: 'id_pembayaran', foreignKey: 'id_pembayaran' })

module.exports = transaksi