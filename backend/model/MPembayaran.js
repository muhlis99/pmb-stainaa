const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const pembayaran = db.define('pembayaran', {
    'id_pembayaran': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'kode_pembayaran': {
        type: DataTypes.TEXT,
    },
    'jumlah_pembayaran': {
        type: DataTypes.TEXT
    },
    'minimal_pembayaran': {
        type: DataTypes.TEXT
    },
    'jumlah_ansuran': {
        type: DataTypes.TEXT
    },
    'tahun': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif','tidak']
    }
}, {
    tableName: 'tb_pmb_pembayaran',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = pembayaran