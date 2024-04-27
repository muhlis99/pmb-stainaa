const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const pertanyaan = require('./Mpertanyaan.js')
// const seleksi = require('./Mselesksi.js')

const jawaban = db.define('jawaban', {
    'id_jawaban': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'kode_jawaban': {
        type: DataTypes.INTEGER,
    },
    'id_pertanyaan': {
        type: DataTypes.TEXT,
    },
    'id_seleksi': {
        type: DataTypes.TEXT,
    },
    'jawaban': {
        type: DataTypes.ENUM,
        values: ['a','b','c','d']
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['benar','salah']
    }
}, {
    tableName: 'tb_pmb_jawaban',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

pertanyaan.belongsTo(jawaban, { foreignKey: 'id_pertanyaan' })
jawaban.hasMany(pertanyaan, { sourceKey: 'id_pertanyaan', foreignKey: 'id_pertanyaan' })
// seleksi.belongsTo(jawaban, { foreignKey: 'id_seleksi' })
// jawaban.hasMany(seleksi, { sourceKey: 'id_seleksi', foreignKey: 'id_seleksi' })


module.exports = jawaban