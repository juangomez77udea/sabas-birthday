import React from 'react'
import { NavLink } from 'react-router-dom'
import BackgroundMusic from './BackgroundMusic'

const Navbar = () => {
    return (
        <header className='flex justify-between items-center sm:px-16 px-8 py-4 max-w-5xl mx-auto absolute top-0 bg-transparent z-10 right-0 left-0'>
            {/* Logo y enlaces */}
            <NavLink to="/" className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                <p className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-600'>Birthday</p>
            </NavLink>
            <nav className='flex text-lg gap-7 font-medium'>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}>
                    About
                </NavLink>
                <NavLink to="/go" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}>
                    Projects
                </NavLink>
            </nav>
            <BackgroundMusic />
        </header>
    )
}

export default Navbar