import React, { useState } from 'react'
import Header2 from './../../layouts/Header2';
import { RotateCcw, LockKeyhole, ChevronRight, ChevronLeft, Lock, EyeOff, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import image from '../../../public/hotel.jpg'

const ResetPassword = () => {
    // const[email,setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
        try {
            // password match validation
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                    return;
                }
            navigate("/signin");
        } catch (error) {
            toast.error(error.response.data.message || "Server Error")
        } finally {
            setIsLoading(false);

        }
    }

    // check password strength
    const getPasswordStrength = (password) => {
        let score = 0;
        let message = "";
        let color = "";
        let bgColor = "";
        let progressColor = "";

        if (!password) {
            return {
            score: 0,
            label: "Too weak",
            message: "Use at least 8 characters.",
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            progressColor: "bg-red-500",
            width: "0%",
            };
        }

        if (password.length >= 8) score += 25;
        if (/[A-Z]/.test(password)) score += 20;
        if (/[a-z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 20;
        if (/[^A-Za-z0-9]/.test(password)) score += 20;

        if (score < 40) {
            message = "Weak password. Add more characters and variety.";
            color = "text-red-500";
            bgColor = "bg-red-500/10";
            progressColor = "bg-red-500";
        } else if (score < 70) {
            message = "Fair. Add uppercase letters or symbols.";
            color = "text-amber-500";
            bgColor = "bg-amber-500/10";
            progressColor = "bg-amber-500";
        } else if (score < 90) {
            message = "Good! Add a symbol for even better security.";
            color = "text-blue-500";
            bgColor = "bg-blue-500/10";
            progressColor = "bg-blue-500";
        } else {
            message = "Great! Include a mix of letters, numbers, and symbols.";
            color = "text-purple-700";
            bgColor = "bg-purple-500/10";
            progressColor = "bg-purple-700";
        }

        let label = "Weak";
        if (score >= 90) label = "Strong";
        else if (score >= 70) label = "Good";
        else if (score >= 40) label = "Fair";

        return {
            score,
            label,
            message,
            color,
            bgColor,
            progressColor,
            width: `${score}%`,
        };
    };

    const passwordStrength = getPasswordStrength(password);

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
            <p className='font-bold text-purple-800 text-3xl md:text-4xl tracking-wide'>Reset Your Password</p>
            <p className='text-slate-500 text-center max-w-md'>
                Please enter your new luxury access credentials below to regain access to your account and continue your journey with us.
            </p>
            <div className=' relative w-full h-40 rounded-2xl overflow-hidden justify-center items-center flex'>
                <div className="absolute w-full h-full bg-purple-950/80"></div>
                <img src={image} alt='image' className='w-full h-full object-cover' />
                <p className='absolute max-w-xs text-white text-center tracking-wide'>
                    "Luxury is personnal. Your security is our priority."
                </p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                <div className="space-y-1 text-left ">
                                <label className="text-sm font-medium text-purple-800">New Password</label>

                                <div className="relative mb-5">
                                    <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                    />

                                    <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 bg-gray-100 text-gray-500 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value )}
                                    />

                                    <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition"
                                    >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>
                                {password && (
                                <div className="mt-5 rounded-2xl border border-purple-200 bg-purple-50/40 p-4">
                                    <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold tracking-wide text-purple-800 uppercase">
                                        Security Level
                                    </p>
                                    <p className={`text-sm font-bold ${passwordStrength.color}`}>
                                        {passwordStrength.label} ({passwordStrength.score}%)
                                    </p>
                                    </div>

                                    <div className="mt-3 h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${passwordStrength.progressColor}`}
                                        style={{ width: passwordStrength.width }}
                                    />
                                    </div>

                                    <p className="mt-3 text-sm italic text-slate-500">
                                    {passwordStrength.message}
                                    </p>
                                </div>
                                )}
                                {/* Confirm password */}
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-purple-800">
                                    Confirm New Password
                                </label>
                                    <div className="relative">
                                    <Lock
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        size={18}
                                    />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-10 pr-10 py-3 bg-gray-100 text-gray-500 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                        setConfirmPassword(e.target.value)} 
                                    />
                                    <span
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </span>
                                    </div>
                            </div>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className='text-white flex items-center justify-center gap-2 
                                rounded-lg py-2 px-4 mt-5 w-full max-w-lg'>
                        Reset Password
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

export default ResetPassword