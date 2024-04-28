const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const prodi = db.define('prodi', {
    'id_prodi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_jenjang_pendidikan': {
        type: DataTypes.TEXT,
    },
    'code_fakultas': {
        type: DataTypes.TEXT
    },
    'code_prodi': {
        type: DataTypes.TEXT
    },
    'code_dikti_prodi': {
        type: DataTypes.TEXT,
    },
    'nama_prodi': {
        type: DataTypes.TEXT,
    },
    'status': {
        type: DataTypes.ENUM,
        values : ["aktif", "tidak"]
    }
}, {
    tableName: 'tb_prodi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = prodi