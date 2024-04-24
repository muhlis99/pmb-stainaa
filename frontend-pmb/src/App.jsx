import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registrasi from "./pages/user/otentikasi/Registrasi"
import Login from "./pages/user/otentikasi/Login"
import VerifyKode from "./pages/user/otentikasi/VerifyKode"
import Dashboard from "./pages/user/dashboard/Dashboard"



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registrasi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyKode" element={<VerifyKode />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
