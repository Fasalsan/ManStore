import React, { useState } from 'react';
import request from "../util/helper";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/shared/Loading";
import FormInputStyle from '../components/styel/formInputStyel';
import mybg from '.././components/image/mybg.jpg'

function Register() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const style = {
        backgroundImage: `url(${mybg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear error on input change
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const CreateUser = async () => {
        await request(`User/Post`, "post", formData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await CreateUser();
            navigate("/login");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={style} className="h-screen flex">
            <div className="w-full flex flex-row-reverse justify-center items-center">
                {loading && <Loading />}
                <div
                    className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1595665593673-bf1ad72905c0")' }}
                >
                    <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm transition-all duration-500"></div>

                    <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

                        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                            <div>
                                <label htmlFor="email" className="block text-sm text-white mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={FormInputStyle}
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && <p className="text-red-200 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm text-white mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={FormInputStyle}
                                    placeholder="Enter your password"
                                    required
                                />
                                {errors.password && <p className="text-red-200 text-sm mt-1">{errors.password}</p>}
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
