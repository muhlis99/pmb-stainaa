const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database.js')

const mahasiswaModel = db.define('mahasiswa', {
    'id_mahasiswa': {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'nim': {
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
    'penerima_kps': {
        type: DataTypes.ENUM,
        values: ['ya', 'tidak']
    },
    'tanggal_masuk_kuliah': {
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
    'code_semester': {
        type: DataTypes.TEXT
    },
    'code_tahun_ajaran': {
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
    'foto_kip': {
        type: DataTypes.TEXT
    },
    'foto_ktm': {
        type: DataTypes.TEXT
    },
    'qrcode': {
        type: DataTypes.TEXT
    },
    'status': {
        type: DataTypes.ENUM,
        values: ["aktif", "tidak"]
    },
    'lastId': {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id_mahasiswa;
        }, set(value) {
            throw new Error('Do not try to set the `id mahasiswa` value!');
        }
    }
}, {
    tableName: 'tb_mahasiswa',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    paranoid: true,
})

module.exports = mahasiswaModel