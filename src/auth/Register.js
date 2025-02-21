// Login.js
import React, { useState } from 'react';
import request from "../util/helper";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/shared/Loading";

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        // phone: '',
        // address: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    // Handles input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, // Update the field that changed
        });
    };

    // CreateNewUser
    const CreateUser = async () => {
        try {
            await request(`User/Post`, "post", formData)

        } catch (error) {
            console.error(error);
        }
    }

    // Handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        CreateUser();
        await setLoading(false)
        navigate("/")
    };

    return (
        <div className='absolute bg-hero bg-no-repeat bg-cover w-full h-screen flex justify-center items-center '>
            {loading && (<Loading />)}
            <div className='bg-white w-[30%] px-6 py-9 rounded-2xl shadow-2xl'>

                <div className='flex justify-center items-center pb-7'>
                    <h1 className='text-2xl font-medium text-orange-700'>Register User</h1>
                </div>

                <form
                    className='flex flex-col gap-4 items-center blur-none z-0 relative'
                    onSubmit={handleSubmit}>
                    <input
                        className='border border-[#f5a65d] w-full px-4 py-2 focus:outline-none rounded-lg'
                        type="text"
                        placeholder="Username"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className='border border-[#f5a65d] w-full px-4 py-2 focus:outline-none rounded-lg'
                        type="text"
                        placeholder="phone"
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        className='border border-[#f5a65d] w-full px-4 py-2 focus:outline-none rounded-lg'
                        type="text"
                        placeholder="address"
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <input
                        className='border border-[#f5a65d] w-full px-4 py-2 focus:outline-none rounded-lg'
                        type="text"
                        placeholder="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className='border border-[#f5a65d] w-full px-4 py-2 focus:outline-none rounded-lg'
                        type="text"
                        placeholder="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        className='bg-orange-700 px-7 py-2 text-white rounded-lg'
                        type="submit">Register</button>
                </form>

                {/* <div className='flex justify-end items-center'> <a href='/'>Sign In</a></div> */}
                <div className='flex gap-4 pt-2 justify-end items-center'>Have an account ? <a href='/' className='text-blue-600'> Sign In</a></div>

            </div>
        </div>
    );
}

export default Register;
