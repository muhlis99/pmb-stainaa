const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const soal = db.define('soal', {
    'id_soal': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'kode_soal': {
        type: DataTypes.TEXT,
    },
    'nama_soal': {
        type: DataTypes.TEXT
    },
    'jumlah_soal': {
        type: DataTypes.TEXT
    },
    'kategori': {
        type: DataTypes.ENUM,
        values: ['pendahuluan','farduAin', 'prodi']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif','tidak']
    }
}, {
    tableName: 'tb_pmb_soal',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = soal