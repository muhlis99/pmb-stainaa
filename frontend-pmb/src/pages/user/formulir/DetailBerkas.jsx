import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from "../../../assets/noimage.svg"
import axios from 'axios'

const DetailBerkas = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { berkas } = useParams()
    const { isError, user } = useSelector((state) => state.auth)
    const [biodata, setBiodata] = useState()
    const [detail, setDetail] = useState()


    useEffect(() => {
        if (isError) {
            navigate('/login')
        }
    }, [isError])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getDataByToken = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/formulir/getByToken/${user.data.token}`)
                    setBiodata(response.data.data)
                }
            } catch (error) {

            }
        }
        getDataByToken()
    }, [user])

    useEffect(() => {
        getDetailBerkas()
    }, [berkas, biodata])

    const getDetailBerkas = async () => {
        if (berkas == 'fotoDiri' && biodata) {
            await axios.get(`v1/formulir/seeImage/pmb/diri/${biodata.foto_diri}`, {
                responseType: "arraybuffer"
            }).then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setDetail(base64)
            })

        } else if (berkas == 'scanKtp' && biodata) {
            await axios.get(`v1/formulir/seeImage/pmb/ktp/${biodata.foto_ktp}`, {
                responseType: "arraybuffer"
            }).then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setDetail(base64)
            })
        } else if (berkas == 'scanKK' && biodata) {
            await axios.get(`v1/formulir/seeImage/pmb/kk/${biodata.foto_kk}`, {
                responseType: "arraybuffer"
            }).then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setDetail(base64)
            })
        } else if (berkas == 'scanIjazah' && biodata) {
            await axios.get(`v1/formulir/seeImage/pmb/ijazah/${biodata.foto_ijazah}`, {
                responseType: "arraybuffer"
            }).then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setDetail(base64)
            })
        } else if (berkas == 'scanSuratKeterangan' && biodata) {
            await axios.get(`v1/formulir/seeImage/pmb/suketSantri/${biodata.foto_suket_santri}`, {
                responseType: "arraybuffer"
            }).then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                setDetail(base64)
            })
        }
    }


    return (
        <div className='text-center d-flex align-items-center justify-content-center'>
            {detail ?
                <img src={`data:;base64,${detail}`} className='border border-3 mt-5' width={500} alt="" />
                :
                ''
            }
        </div>
    )
}

export default DetailBerkas