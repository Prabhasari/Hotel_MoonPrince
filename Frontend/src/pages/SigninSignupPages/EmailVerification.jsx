import { ChevronLeft, ChevronRight, Clock3, MailCheck  } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Header2 from './../../layouts/Header2';

const EmailVerification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);

    useEffect(() => {
        if (secondsLeft <= 0) {
        setCanResend(true);
        return;
        }

        const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const code = otp.join("");
    
        try {
            if (code.length !== 6) {
                toast.error("Please enter the 6-digit verification code.");
                return;
            }
            navigate("/reset-password");
        } catch (error) {
            toast.error(error.response.data.message || "Server Error")
        } finally {
            setIsLoading(false);

        }
    }

    const handleResendCode = async () => {
        if (!canResend) return;

        try {
        console.log("Resend verification code");

        // call resend API here

        setSecondsLeft(30);
        setCanResend(false);
        } catch (error) {
        console.log(error);
        }
    };

  return (
    <>
    <Header2 />
    <div className='relative w-screen min-h-screen bg-purple-50 justify-center items-center flex flex-col '>
    <div className='relative flex flex-col justify-center items-center gap-5'>
        <div className='bg-white border-2 border-white rounded-lg shadow-2xl p-8 justify-center items-center flex flex-col gap-5 py-5 px-5 max-w-lg mx-auto
                        border-t-4 border-t-[#D4AF37]'>
            <div className='w-15 h-15 bg-purple-600/20 flex items-center justify-center rounded-full shadow-lg text-[#6A0DAD]'>
                <MailCheck size={40} />
            </div>
            <p className='font-bold text-purple-800 text-3xl md:text-4xl tracking-wide'>
                Verify Your Email
            </p>
            <p className='text-slate-500 text-center max-w-md'>
                A 6-digit verification code has been sent to your email address. please enter it below to confirm your account.
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                <div className="flex gap-3 md:gap-4 justify-center mt-2 mb-6">
                {otp.map((digit, index) => (
                    <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 md:w-14 md:h-14 text-center text-lg font-semibold text-black
                                rounded-xl border border-slate-300 outline-none
                                focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                    />
                ))}
                </div>

                <div className="flex items-center justify-center gap-2 mb-3 text-sm text-slate-500">
                <Clock3 size={14} />
                {canResend ? (
                    <span>You can resend the code now</span>
                ) : (
                    <span>
                    Resend code in <span className="text-purple-700 font-semibold">{secondsLeft}</span> seconds
                    </span>
                )}
                </div>

                <Link
                    onClick={handleResendCode}
                    disabled={!canResend}
                    className={`text-sm font-medium text-center underline bg-white! border-none! ${
                        canResend
                        ? "text-slate-600 hover:text-purple-700 cursor-pointer border-none!"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                    >
                    Didn't receive the code? Resend
                </Link>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className='text-white flex items-center justify-center gap-2 
                                rounded-lg py-2 px-4 mt-5 w-full max-w-lg'>
                        {isLoading ? "Verifying..." : "Verify Code"}
                        {!isLoading && <ChevronRight size={20} />}
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

export default EmailVerification