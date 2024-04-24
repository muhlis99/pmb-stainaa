const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const registrasi = db.define('registrasi', {
    'id_pmb': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'token': {
        type: DataTypes.TEXT,
    },
    'nama': {
        type: DataTypes.TEXT
    },
    'email': {
        type: DataTypes.TEXT
    },
    'password': {
        type: DataTypes.TEXT
    },
    'role': {
        type: DataTypes.TEXT
    },
    'verifikasi_kode': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif','tidak']
    }
}, {
    tableName: 'tb_pmb_user',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = registrasi