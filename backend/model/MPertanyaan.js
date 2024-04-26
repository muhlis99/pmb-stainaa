const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const soal = require('./Msoal.js')

const pertanyaan = db.define('pertanyaan', {
    'id_pertanyaan': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'id_soal': {
        type: DataTypes.INTEGER,
    },
    'pertanyaan': {
        type: DataTypes.TEXT,
    },
    'kode_pertanyaan': {
        type: DataTypes.TEXT,
    },
    'pilihan_a': {
        type: DataTypes.TEXT
    },
    'pilihan_b': {
        type: DataTypes.TEXT
    },
    'pilihan_c': {
        type: DataTypes.TEXT
    },
    'pilihan_d': {
        type: DataTypes.TEXT
    },
    'kunci_jawaban': {
        type: DataTypes.ENUM,
        values: ['a','b','c','d']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif','tidak']
    }
}, {
    tableName: 'tb_pmb_pertanyaan',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

soal.belongsTo(pertanyaan, { foreignKey: 'id_soal' })
pertanyaan.hasMany(soal, { sourceKey: 'id_soal', foreignKey: 'id_soal' })

module.exports = pertanyaan