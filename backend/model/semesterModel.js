const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const semesterModel = db.define('semester', {
    'id_semester': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_semester': {
        type: DataTypes.TEXT,
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT,
    },
    'semester': {
        type: DataTypes.TEXT
    },
    'tanggal_aktif': {
        type: DataTypes.TEXT
    },
    'tanggal_non_aktif': {
        type: DataTypes.TEXT
    },
    'keterangan': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    }
}, {
    tableName: 'tb_semester',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = semesterModel