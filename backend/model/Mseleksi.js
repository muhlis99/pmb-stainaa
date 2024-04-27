const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const formulir = require('./Mformulir.js')

const seleksi = db.define('seleksi', {
    'id_seleksi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'kode_seleksi': {
        type: DataTypes.INTEGER,
    },
    'token': {
        type: DataTypes.TEXT,
    },
    'tanggal_mulai': {
        type: DataTypes.TEXT,
    },
    'tanggal_akhir': {
        type: DataTypes.TEXT,
    },
    'total_soal': {
        type: DataTypes.TEXT,
    },
    'total_selesai': {
        type: DataTypes.TEXT,
    },
    'total_belum': {
        type: DataTypes.TEXT,
    },
    'total_benar': {
        type: DataTypes.TEXT,
    },
    'total_salah': {
        type: DataTypes.TEXT,
    },
    'total_durasi': {
        type: DataTypes.TEXT,
    },
    'score': {
        type: DataTypes.TEXT,
    },
    'status_info': {
        type: DataTypes.ENUM,
        values: ['1','0']
    }
}, {
    tableName: 'tb_pmb_seleksi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

formulir.belongsTo(seleksi, { foreignKey: 'token' })
seleksi.hasMany(formulir, { sourceKey: 'token', foreignKey: 'token' })


module.exports = seleksi