// Login.js
import React, { useState } from 'react';
import request from "../util/helper";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/shared/Loading";
import FormInputStyle from '../components/styel/formInputStyel';
import mybg from '.././components/image/mybg.jpg'


function Register() {

    const [formData, setFormData] = useState({
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
        navigate("/login");
    };

    return (
        <div style={style} className="h-screen flex">
            <div className="w-full flex flex-row-reverse justify-center items-center">
                {loading && (<Loading />)}
                <div
                    className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D")' }}
                >
                    <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm transition-all duration-500"></div>

                    <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm text-white mb-1">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={FormInputStyle}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label  className="block text-sm text-white mb-1">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={FormInputStyle}
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-white/80 text-black hover:bg-white font-semibold py-2 rounded-xl"
                            >
                                Register
                            </button>
                        </form>

                        <p className="text-sm text-white text-center mt-4">
                            Have an account?{' '}
                            <a href="/login" className="text-white underline hover:text-blue-200">
                                login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
