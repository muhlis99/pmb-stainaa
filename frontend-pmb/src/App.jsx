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
import TransaksiPembayaran from "./pages/user/pembayaran/TransaksiPembayaran"

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
          <Route path="/pembayaran" element={<TransaksiPembayaran />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
