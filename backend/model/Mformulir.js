const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')
const { desa, kecamatan, kabupaten, provinsi, negara } = require('./Mequipment.js')


const formulir = db.define('formulir', {
    'id': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'token': {
        type: DataTypes.TEXT,
    },
    'no_kk': {
        type: DataTypes.TEXT
    },
    'nik': {
        type: DataTypes.TEXT
    },
    'no_kps': {
        type: DataTypes.TEXT
    },
    'nisn': {
        type: DataTypes.TEXT
    },
    'npwp': {
        type: DataTypes.TEXT
    },
    'nama': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir': {
        type: DataTypes.TEXT
    },
    'tempat_lahir': {
        type: DataTypes.TEXT
    },
    'jenis_kelamin': {
        type: DataTypes.ENUM,
        values: ['l', 'p']
    },
    'penerima_kps': {
        type: DataTypes.ENUM,
        values: ['ya', 'tidak']
    },
    'jalan': {
        type: DataTypes.TEXT
    },
    'dusun': {
        type: DataTypes.TEXT
    },
    'rt': {
        type: DataTypes.INTEGER
    },
    'rw': {
        type: DataTypes.INTEGER
    },
    'kode_pos': {
        type: DataTypes.INTEGER
    },
    'desa': {
        type: DataTypes.INTEGER
    },
    'kecamatan': {
        type: DataTypes.INTEGER
    },
    'kabupaten': {
        type: DataTypes.INTEGER
    },
    'provinsi': {
        type: DataTypes.INTEGER
    },
    'negara': {
        type: DataTypes.INTEGER
    },
    'alat_transportasi': {
        type: DataTypes.TEXT
    },
    'jalur_pendaftaran': {
        type: DataTypes.TEXT
    },
    'jenis_pendaftaran': {
        type: DataTypes.TEXT
    },
    'jenis_tinggal': {
        type: DataTypes.TEXT
    },
    'email': {
        type: DataTypes.TEXT
    },
    'no_hp': {
        type: DataTypes.TEXT
    },
    'no_telepon': {
        type: DataTypes.TEXT
    },
    'nik_ayah': {
        type: DataTypes.TEXT
    },
    'nama_ayah': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir_ayah': {
        type: DataTypes.TEXT
    },
    'pekerjaan_ayah': {
        type: DataTypes.TEXT
    },
    'penghasilan_ayah': {
        type: DataTypes.TEXT
    },
    'pendidikan_ayah': {
        type: DataTypes.TEXT
    },
    'nik_ibu': {
        type: DataTypes.TEXT
    },
    'nama_ibu': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir_ibu': {
        type: DataTypes.TEXT
    },
    'pekerjaan_ibu': {
        type: DataTypes.TEXT
    },
    'penghasilan_ibu': {
        type: DataTypes.TEXT
    },
    'pendidikan_ibu': {
        type: DataTypes.TEXT
    },
    'nik_wali': {
        type: DataTypes.TEXT
    },
    'nama_wali': {
        type: DataTypes.TEXT
    },
    'tanggal_lahir_wali': {
        type: DataTypes.TEXT
    },
    'pekerjaan_wali': {
        type: DataTypes.TEXT
    },
    'penghasilan_wali': {
        type: DataTypes.TEXT
    },
    'pendidikan_wali': {
        type: DataTypes.TEXT
    },
    'tanggal_daftar': {
        type: DataTypes.TEXT
    },
    'foto_diri': {
        type: DataTypes.TEXT
    },
    'foto_kk': {
        type: DataTypes.TEXT
    },
    'foto_ktp': {
        type: DataTypes.TEXT
    },
    'foto_ijazah': {
        type: DataTypes.TEXT
    },
    'foto_suket_santri': {
        type: DataTypes.TEXT
    },
    'lastId': {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id_pmb;
        }, set(value) {
            throw new Error('Do not try to set the `id mahasiswa` value!');
        }
    }
}, {
    tableName: 'tb_pmb_formulir',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

desa.belongsTo(formulir, { foreignKey: 'code_desa' })
formulir.hasMany(desa, { sourceKey: 'desa', foreignKey: 'code_desa' })
kecamatan.belongsTo(formulir, { foreignKey: 'code_kecamatan' })
formulir.hasMany(kecamatan, { sourceKey: 'kecamatan', foreignKey: 'code_kecamatan' })
kabupaten.belongsTo(formulir, { foreignKey: 'code_kabupaten' })
formulir.hasMany(kabupaten, { sourceKey: 'kabupaten', foreignKey: 'code_kabupaten' })
provinsi.belongsTo(formulir, { foreignKey: 'code_provinsi' })
formulir.hasMany(provinsi, { sourceKey: 'provinsi', foreignKey: 'code_provinsi' })
negara.belongsTo(formulir, { foreignKey: 'code_negara' })
formulir.hasMany(negara, { sourceKey: 'negara', foreignKey: 'code_negara' })

module.exports = formulir