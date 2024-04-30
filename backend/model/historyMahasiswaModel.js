const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const historyMahasiswa = db.define('historyMahasiswa', {
    'id_history': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'code_history': {
        type: DataTypes.TEXT,
    },
    'nim': {
        type: DataTypes.TEXT,
    },
    'code_tahun_ajaran': {
        type: DataTypes.TEXT
    },
    'code_semester': {
        type: DataTypes.TEXT
    },
    'code_jenjang_pendidikan': {
        type: DataTypes.TEXT
    },
    'code_fakultas': {
        type: DataTypes.TEXT
    },
    'code_prodi': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ['aktif', 'tidak']
    },
    'lastId': {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id_history;
        }, set(value) {
            throw new Error('Do not try to set the `id mahasiswa` value!');
        }
    }
}, {
    tableName: 'tb_history_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = historyMahasiswa