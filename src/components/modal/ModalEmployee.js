import React, { useState, useEffect } from 'react';
import FormInputStyle from '../styel/formInputStyel';

const ModalEmployee = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
    });

    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                email: ''
            });
        }
    }, [initialData, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[50%]">
                <h2 className="text-xl font-bold mb-4">
                    {mode === 'create' ? 'Create User' : 'Update User'}
                </h2>
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-2"
                >
                    <div className='flex gap-4'>

                        <input
                            type="text"
                            placeholder='firstName'
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />
                        <input
                            type="text"
                            placeholder='lastName'
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />
                    </div>
                    <div className='flex gap-4'>

                        <input
                            type="text"
                            placeholder='phone'
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />
                        <input
                            type="text"
                            placeholder='address'
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />

                    </div>
                    <input
                        type="text"
                        placeholder='email'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={FormInputStyle}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            {mode === 'create' ? 'Create' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEmployee;
