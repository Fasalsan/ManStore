// Login.js
import React, { useState } from 'react';
import request from "../util/helper";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/shared/Loading";
import FormInputStyle from '../components/styel/formInputStyel';
import mybg from '.././components/image/mybg.jpg'


function Register() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const style = {
        backgroundImage: `url(${mybg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "",
        width: "100%",
    };

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
            await request(`Employee/Post`, "post", formData)

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
        <div style={style} className="h-screen flex">
            <div className="w-full flex flex-row-reverse justify-center items-center">
                {loading && (<Loading />)}
                <div className='bg-[#f6f6fd] w-[30%] px-6 py-9 rounded-2xl shadow-2xl'>

                    <div className='flex justify-center items-center pb-7'>
                    <h1 className="text-2xl font-bold text-[#163c82]">Register</h1>
                    </div>

                    <form
                        className='flex flex-col gap-4 items-center blur-none z-0 relative'
                        onSubmit={handleSubmit}>
                       
                        <input
                            className={FormInputStyle}
                            type="text"
                            placeholder="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            className={FormInputStyle}
                            type="text"
                            placeholder="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            className='bg-[#163c82] px-7 py-2 text-white rounded-lg'
                            type="submit">Register</button>
                    </form>

                    {/* <div className='flex justify-end items-center'> <a href='/'>Sign In</a></div> */}
                    <div className='flex gap-4 pt-2 justify-end items-center'>Have an account ? <a href='/' className='text-blue-600'> Sign In</a></div>

                </div>
            </div>
        </div>
    );
}

export default Register;
