import React from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../public/Logo.png';

const Header2 = () => {

    const navigate = useNavigate();

  return (
   <nav className='fixed top-0 left-0 right-0 bg-white backdrop-teal-sm backdrop-blur-md z-50  dark:border-gray-900 shadow-sm'>
    <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-2 h-20'>
                {/*logo*/}
                <div className='flex items-center gap-1 cursor-pointer '>
                    {/* bg-teal-600 rounded-lg px-6 py-1  */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                        <img src={Logo} alt="Logo" 
                        className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className='ml-2 text-sm lg:text-xl font-medium text-purple-800 tracking-widest'>
                        Hotel MoonPrince
                    </div>
                </div>
    
                
                <button
                    onClick={() => {
                        navigate("/signin");
                    }}
                    className="text-left px-4 py-2 text-white"
                >
                    Sign In
                </button>
            </div>
   </nav>
  )
}

export default Header2