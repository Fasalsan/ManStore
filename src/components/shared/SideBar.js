import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { sidebar } from '../navigation';

export default function SideBar() {
    return (
        <div className='bg-[#163c82] w-[15%] h-screen text-white'>
            <div className='pb-7 text-2xl font-bold p-5 '>
                {/* <a href="/dashboard"> <h1>QV_STORE</h1></a> */}
                <Link to={"/dashboard"}>Man Store</Link>
            </div>
            <nav>

                <ul className="flex flex-col text-[16px]">
                    {sidebar?.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                `p-4 text-[18px] transition-all ${isActive ? 'bg-[#193363] text-[#dcdcdc]' : 'hover:bg-[#193363] hover:text-[#dcdcdc]'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>

                    ))}
                </ul>
            </nav>
        </div>
    )
}
