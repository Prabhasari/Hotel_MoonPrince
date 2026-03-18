import React, { useState } from 'react'
import Header2 from './../../layouts/Header2';
import { ChevronLeft, ChevronRight, LockKeyhole, RotateCcw, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const[email,setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
        try {
            console.log("first")
            navigate("/email-verification", { state: { email } });
        } catch (error) {
            toast.error(error.response.data.message || "Server Error")
        } finally {
            setIsLoading(false);

        }
    }

  return (
    <>
    <Header2 />
    <div className='relative w-screen min-h-screen bg-purple-50 justify-center items-center flex flex-col '>
    <div className='relative flex flex-col justify-center items-center gap-5'>
        <div className='bg-white border-2 border-white rounded-lg shadow-2xl p-8 justify-center items-center flex flex-col gap-5 py-5 px-5 max-w-lg mx-auto
                        border-t-4 border-t-[#D4AF37]'>
            <div className='w-15 h-15 bg-purple-600/20 flex items-center justify-center rounded-full shadow-lg text-[#6A0DAD]'>
                <RotateCcw size={40} />
                <LockKeyhole size={15} className='absolute' />
            </div>
            <p className='font-bold text-purple-800 text-3xl md:text-4xl tracking-wide'>Forget Password</p>
            <p className='text-slate-500 text-center max-w-md'>
                Enter your email address and we'll send a 6-digit verification code.
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                <label className='text-sm text-purple-800 tracking-wide text-left w-full max-w-lg'>Email Address</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 mb-5 bg-gray-100 text-gray-500 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className='text-white flex items-center justify-center gap-2 
                                rounded-lg py-2 px-4 mt-5 w-full max-w-lg'>
                        Send Verification Code
                        <ChevronRight size={20} />
                </button>
            </form>
            <div className="mt-1 pt-3 pb-3">
                <Link
                    to="/Signin"
                    className="inline-flex gap-3 items-center text-sm font-medium text-gray-600 "
                >
                    <ChevronLeft size={18} />
                    Back to Login
                </Link>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default ForgetPassword