import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registrasi from "./pages/user/otentikasi/Registrasi"
import Login from "./pages/user/otentikasi/Login"
import VerifyKode from "./pages/user/otentikasi/VerifyKode"
import Dashboard from "./pages/user/dashboard/Dashboard"
import Forgot from "./pages/user/otentikasi/Forgot"


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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
