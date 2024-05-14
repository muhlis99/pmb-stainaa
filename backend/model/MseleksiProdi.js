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
    'prodi_primer': {
        type: DataTypes.TEXT
    },
    'prodi_sekunder': {
        type: DataTypes.TEXT,
    },
    'prodi_seleksi_admin': {
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
seleksiProdi.hasMany(prodi, { sourceKey: 'prodi_primer', foreignKey: 'id_prodi', as: "prodiprimer" })

prodi.belongsTo(seleksiProdi, { foreignKey: 'id_prodi' })
seleksiProdi.hasMany(prodi, { sourceKey: 'prodi_sekunder', foreignKey: 'id_prodi',as: "prodisekunder"  })

prodi.belongsTo(seleksiProdi, { foreignKey: 'id_prodi' })
seleksiProdi.hasMany(prodi, { sourceKey: 'prodi_seleksi_admin', foreignKey: 'id_prodi', as: "prodiseleksiadmin"})

formuilr.belongsTo(seleksiProdi, { foreignKey: 'token' })
seleksiProdi.hasMany(formuilr, { sourceKey: 'token', foreignKey: 'token' })

module.exports = seleksiProdi