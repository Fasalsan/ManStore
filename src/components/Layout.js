import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from './shared/SideBar';
import { HiOutlineUserCircle } from "react-icons/hi2";
import Breadcrumbs from './Breadcrumbs';
import Loading from '../components/shared/Loading';

export default function Layout() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navigate = useNavigate();

    const logout = () => {
        setLoading(true); 

        setTimeout(() => {
            localStorage.removeItem("authToken");
            navigate("/login"); 
            setLoading(false);
        }, 2000);
    };

    return (
        <>
            <div className='flex'>
                <SideBar />
                <main className='bg-gray-100 w-full'>
                    {/* head */}
                    <div className='bg-[#163c82] px-5 py-4  w-full flex justify-between items-center'>
                        <div>
                            <h1 className='text-white text-xl'><Breadcrumbs /></h1>
                        </div>

                        <div className="relative inline-block text-left" ref={dropdownRef}>
                            {/* Button to Toggle Dropdown */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="px-4 py-2 text-5xl text-white rounded-md focus:outline-none"
                            >
                                <HiOutlineUserCircle />
                            </button>

                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <a href="" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Profile
                                    </a>
                                    <a href="" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Settings
                                    </a>
                                    <button
                                        onClick={() => logout()}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {loading && <Loading />}

                    <div className='px-8 py-4'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}
