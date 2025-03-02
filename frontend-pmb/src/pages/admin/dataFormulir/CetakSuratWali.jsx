import React, { useEffect, useState } from 'react'
import moment from "moment"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import kop from "../../../assets/kopForm.png"

const CetakSuratWali = () => {
    const { token } = useParams()
    const [biodata, setBiodata] = useState([])

    useEffect(() => {
        const getDataByToken = async () => {
            try {
                const response = await axios.get(`v1/formulir/getByToken/${token}`)
                setBiodata(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        getDataByToken()


        setTimeout(() => {
            window.print()
        }, 2000);
    }, [token])

    window.onafterprint = function (e) {
        window.close()
    }

    return (
        <div style={{ fontSize: '13px', fontFamily: 'Times New Roman, Times, serif' }}>
            <img src={kop} alt="" width={1000} />

            <div style={{ marginTop: '20px' }} className='text-center'>
                <h4>PENERIMAAN MAHASISWA BARU</h4>
                <h4>SURAT PERNYATAAN KESANGGUPAN</h4>
            </div>

            <div style={{ marginTop: '20px', marginLeft: '80px', marginRight: '80px' }}>
                <span style={{ fontSize: '13px', fontFamily: 'Times New Roman, Times, serif' }}>Apabila saya diterima menjadi mahasiswa
                    Sekolah Tinggi Agama Islam (STAI) Nurul Abror Al-Robbaniyin dengan ini saya menyatakan bersedia memenuhi ketentuan berikut :</span><br />
                <ol style={{ fontSize: '13px', fontFamily: 'Times New Roman, Times, serif' }}>
                    <li>Bersedia memenuhi beban Biaya Pendidikan yang berlaku di Sekolah Tinggi Agama Islam (STAI) Nurul Abror Al-Robbaniyin</li>
                    <li>Bersedia memenuhi dan melaksanakan segala peraturan yang berlaku di Sekolah Tinggi Agama Islam (STAI) Nurul Abror Al-Robbaniyin</li>
                    <li>Bersedia menerima sanksi apabila melanggar peraturan di Sekolah Tinggi Agama Islam (STAI) Nurul Abror Al-Robbaniyin</li>
                </ol>
                <span style={{ fontSize: '13px', fontFamily: 'Times New Roman, Times, serif', textAlign: 'justify' }}>Demikian pernyataan ini saya buat dengan sebenarnya, dan selanjutnya sanggup untuk menyelesaikan sesuai aturan yang berlaku di Sekolah Tinggi Agama Islam (STAI)</span>
            </div>

            <div className="row" style={{ marginTop: '50px' }}>
                <div className="col-6 text-center">
                    <span>Mengetahui,</span><br />
                    <span>Orang Tua/Wali Calon Mahasiswa,</span>
                    <p style={{ marginTop: '80px' }}>...................................</p>
                </div>
                <div className="col-6 text-center">
                    <span>Alasbuluh, {moment().format('DD MMMM YYYY')}</span><br />
                    <span>Calon Mahasiswa,</span>
                    <p style={{ marginTop: '80px' }}><b>{biodata.nama}</b></p>
                </div>
            </div>
        </div>
    )
}

export default CetakSuratWali