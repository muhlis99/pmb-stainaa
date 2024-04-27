const { body, check } = require('express-validator')

exports.validationPertanyaan = [
    check('id_soal')
        .notEmpty()
        .withMessage('soal tidak boleh kosong'),
    check('pertanyaan')
        .notEmpty()
        .withMessage('pertanyaan tidak boleh kosong'),
    check('pilihan_a')
        .notEmpty()
        .withMessage('pilihan ganda a tidak boleh kosong'),
    check('pilihan_b')
        .notEmpty()
        .withMessage('pilihan ganda b tidak boleh kosong'),
    check('pilihan_c')
        .notEmpty()
        .withMessage('pilihan ganda c tidak boleh kosong'),
    check('pilihan_d')
        .notEmpty()
        .withMessage('pilihan ganda d tidak boleh kosong'),
    check('kunci_jawaban')
        .notEmpty()
        .withMessage('kunci jawaban tidak boleh kosong'),
]