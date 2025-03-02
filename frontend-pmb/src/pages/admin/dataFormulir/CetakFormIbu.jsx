import React, { useEffect, useState } from 'react'
import moment from "moment"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import kop from "../../../assets/kopForm.png"

const CetakFormIbu = () => {
    const { token } = useParams()
    const [biodata, setBiodata] = useState([])
    const [negara, setNegara] = useState('')
    const [desa, setDesa] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kabupaten, setKabupaten] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [pekerjaanIbu, setPekerjaanIbu] = useState("")
    const [penghasilanIbu, setPenghasilanIbu] = useState("")
    const [pendidikanIbu, setPendidikanIbu] = useState("")

    useEffect(() => {
        const getDataByToken = async () => {
            try {
                const response = await axios.get(`v1/formulir/getByToken/${token}`)
                setBiodata(response.data.data);
                setNegara(response.data.data.negaras[0].nama_negara)
                setDesa(response.data.data.desas[0].nama_desa)
                setKecamatan(response.data.data.kecamatans[0].nama_kecamatan)
                setKabupaten(response.data.data.kabupatens[0].nama_kabupaten)
                setProvinsi(response.data.data.provinsis[0].nama_provinsi)
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

    useEffect(() => {
        pekerjaanIbuByCode()
        pendidikanIbuByCode()
        penghasilanIbuByCode()
    }, [biodata])

    const pekerjaanIbuByCode = async () => {
        if (biodata.pekerjaan_ibu) {
            const response = await axios.get(`v1/equipment/pekerjaan/getByCode/${biodata.pekerjaan_ibu}`)
            setPekerjaanIbu(response.data.data.nama_pekerjaan)
        }
    }

    const pendidikanIbuByCode = async () => {
        if (biodata.pendidikan_ibu) {
            const response = await axios.get(`v1/equipment/pendidikan/getByCode/${biodata.pendidikan_ibu}`)
            setPendidikanIbu(response.data.data.nama_pendidikan)
        }
    }

    const penghasilanIbuByCode = async () => {
        if (biodata.penghasilan_ibu) {
            const response = await axios.get(`v1/equipment/penghasilan/getByCode/${biodata.penghasilan_ibu}`)
            setPenghasilanIbu(response.data.data.nama_penghasilan)
        }
    }

    return (
        <div style={{ fontSize: '14px', fontFamily: 'Times New Roman, Times, serif' }}>
            <img src={kop} alt="" width={1000} />
            <div style={{ marginTop: '20px' }} className='text-center'>
                <h4>PENERIMAAN MAHASISWA BARU</h4>
                <h4>FORMULIR IBU</h4>
            </div>
            <div style={{ marginTop: '20px' }}>
                <table style={{ marginLeft: '50px' }} cellPadding={6}>
                    <tbody>
                        <tr>
                            <td>NAMA MAHASISWA</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.nama}</td>
                        </tr>
                        <tr>
                            <td>NAMA IBU</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.nama_ibu}</td>
                        </tr>
                        <tr>
                            <td>TANGGAL LAHIR</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{moment(biodata.tanggal_lahir_ibu).format('DD - MM - YYYY')}</td>
                        </tr>
                        <tr>
                            <td>NIK (NO. KTP)</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.nik_ibu}</td>
                        </tr>
                        <tr>
                            <td>NO. KARTU KELUARGA</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.no_kk}</td>
                        </tr>
                        <tr>
                            <td>KEWARGANEGARAAN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{negara}</td>
                        </tr>
                        <tr>
                            <td>JALAN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.jalan}</td>
                        </tr>
                        <tr>
                            <td>DUSUN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.dusun}</td>
                        </tr>
                        <tr>
                            <td>RT</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.rt}</td>
                        </tr>
                        <tr>
                            <td>RW</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.rw}</td>
                        </tr>
                        <tr>
                            <td>KELURAHAN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{desa}</td>
                        </tr>
                        <tr>
                            <td>KECAMATAN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{kecamatan}</td>
                        </tr>
                        <tr>
                            <td>KABUPATEN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{kabupaten}</td>
                        </tr>
                        <tr>
                            <td>PROVINSI</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{provinsi}</td>
                        </tr>
                        <tr>
                            <td>KODE POS</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.kode_pos}</td>
                        </tr>
                        <tr>
                            <td>TELEPON/HP</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td>{biodata.no_hp}/{biodata.no_telepon}</td>
                        </tr>
                        <tr>
                            <td>PENDIDIKAN TERAKHIR</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td className='text-uppercase'>{pendidikanIbu}</td>
                        </tr>
                        <tr>
                            <td>PEKERJAAN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td className='text-uppercase'>{pekerjaanIbu}</td>
                        </tr>
                        <tr>
                            <td>PENGHASILAN</td>
                            <td>&nbsp;:&nbsp;</td>
                            <td className='text-uppercase'>{penghasilanIbu}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CetakFormIbu