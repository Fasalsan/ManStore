import React, { useState, useEffect } from 'react';
import request from '../../util/helper';

const ModalCustomer = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        fetchCategories();
        if (mode === 'update' && initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: ''
            });
        }
    }, [initialData, mode]);

    const fetchCategories = async () => {
        const response = await request("Category/GetAll", "get")
        setCategory(response);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">
                    {mode === 'create' ? 'Create Customer' : 'Update Customer'}
                </h2>
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-2"
                >
                    <input
                        type="text"
                        placeholder='name'
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-3 py-2.5 border border-gray-300 focus:border-[#f5a65d] focus:ring-2 focus:ring-[#f5a65d] hover:outline-none rounded-lg'
                    />
                    <input
                        type="text"
                        placeholder='phone'
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full px-3 py-2.5 border border-gray-300 focus:border-[#f5a65d] focus:ring-2 focus:ring-[#f5a65d] hover:outline-none rounded-lg'
                    />
                       <input
                        type="text"
                        placeholder='address'
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className='w-full px-3 py-2.5 border border-gray-300 focus:border-[#f5a65d] focus:ring-2 focus:ring-[#f5a65d] hover:outline-none rounded-lg'
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

export default ModalCustomer;
