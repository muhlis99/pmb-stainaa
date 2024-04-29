const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const formulir = require('./Mformulir.js')

const approve = db.define('approve', {
    'id_approve': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'token': {
        type: DataTypes.INTEGER,
    },
    'status_formulir': {
        type: DataTypes.ENUM,
        values: ['selesai','belum']
    },
    'status_pembayaran': {
        type: DataTypes.ENUM,
        values: ['selesai','belum']
    },
    'status_seleksi': {
        type: DataTypes.ENUM,
        values: ['selesai','belum']
    },
    'tanggal_approve': {
        type: DataTypes.ENUM,
        values: ['selesai','belum']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['setuju','tidak']
    }
}, {
    tableName: 'tb_pmb_approve',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

formulir.belongsTo(approve, { foreignKey: 'token' })
approve.hasMany(formulir, { sourceKey: 'token', foreignKey: 'token' })

module.exports = approve