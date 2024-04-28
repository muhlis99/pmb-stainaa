const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const formulir = require('./Mformulir.js')

const informasi = db.define('informasi', {
    'id_informasi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'judul': {
        type: DataTypes.TEXT,
    },
    'isi': {
        type: DataTypes.TEXT
    },
    'token': {
        type: DataTypes.TEXT
    },
    'tanggal': {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'tb_pmb_informasi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

formulir.belongsTo(informasi, { foreignKey: 'token' })
informasi.hasMany(formulir, { sourceKey: 'token', foreignKey: 'token' })

module.exports = informasi