const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const prodi = require('./Mprodi.js')
const formuilr = require('./Mformulir.js')

const seleksiProdi = db.define('seleksiProdi', {
    'id_seleksi_prodi': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'kode_seleksi_prodi': {
        type: DataTypes.TEXT,
    },
    'token': {
        type: DataTypes.TEXT
    },
    'id_prodi': {
        type: DataTypes.TEXT
    },
    'tahun': {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'tb_pmb_seleksi_prodi',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

prodi.belongsTo(seleksiProdi, { foreignKey: 'id_prodi' })
seleksiProdi.hasMany(prodi, { sourceKey: 'id_prodi', foreignKey: 'id_prodi' })

formuilr.belongsTo(seleksiProdi, { foreignKey: 'token' })
seleksiProdi.hasMany(formuilr, { sourceKey: 'token', foreignKey: 'token' })

module.exports = seleksiProdi