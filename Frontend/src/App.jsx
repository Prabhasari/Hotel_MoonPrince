import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './App.css'

import Signin from './pages/SigninSignupPages/Signin'
import Signup from './pages/SigninSignupPages/Signup'
import Home from './pages/HomePages/Home'
import ForgetPassword from './pages/SigninSignupPages/ForgetPassword'
import EmailVerification from './pages/SigninSignupPages/EmailVerification'
import ResetPassword from './pages/SigninSignupPages/ResetPassword'


function App() {

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/email-verification' element={<EmailVerification />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
    </>
  )
}

export default App
