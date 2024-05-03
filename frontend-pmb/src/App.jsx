import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registrasi from "./pages/user/otentikasi/Registrasi"
import Login from "./pages/user/otentikasi/Login"
import VerifyKode from "./pages/user/otentikasi/VerifyKode"
import Dashboard from "./pages/user/dashboard/Dashboard"
import Forgot from "./pages/user/otentikasi/Forgot"
import CekFormulir from "./pages/user/formulir/CekFormulir"
import Form1 from "./pages/user/formulir/Form1"
import Form2 from "./pages/user/formulir/Form2"
import Form3 from "./pages/user/formulir/Form3"
import Form4 from "./pages/user/formulir/Form4"
import Form5 from "./pages/user/formulir/Form5"
import DetailFormulir from "./pages/user/formulir/DetailFormulir"
import TransaksiPembayaran from "./pages/user/pembayaran/TransaksiPembayaran"
import Home from "./pages/admin/dashboard/Home"
import InformasiSeleksi from "./pages/user/seleksi/InformasiSeleksi"
import FormSeleksi from "./pages/user/seleksi/FormSeleksi"
import PemilihanProdi from "./pages/user/seleksi/PemilihanProdi"
import ListFormulir from "./pages/admin/dataFormulir/ListFormulir"
import PembayaranList from "./pages/admin/pembayaran/PembayaranList"
import TransaksiList from "./pages/admin/transaksi/TransaksiList"
import TransaksiCek from "./pages/admin/transaksi/TransaksiCek"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registrasi />} />
          <Route path="/verifyKode" element={<VerifyKode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cekdetaildata" element={<CekFormulir />} />
          <Route path="/formulir1" element={<Form1 />} />
          <Route path="/formulir2" element={<Form2 />} />
          <Route path="/formulir3" element={<Form3 />} />
          <Route path="/formulir4" element={<Form4 />} />
          <Route path="/formulir5" element={<Form5 />} />
          <Route path="/detailformulir" element={<DetailFormulir />} />
          <Route path="/pembayaran" element={<TransaksiPembayaran />} />
          <Route path="/infoseleksi" element={<InformasiSeleksi />} />
          <Route path="/formseleksi" element={<FormSeleksi />} />
          <Route path="/pemilihanProdi" element={<PemilihanProdi />} />

          <Route path="/home" element={<Home />} />
          <Route path="/dataFormulir" element={<ListFormulir />} />
          <Route path="/pembayaranlist" element={<PembayaranList />} />
          <Route path="/transaksi" element={<TransaksiList />} />
          <Route path="/cektransaksi" element={<TransaksiCek />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
