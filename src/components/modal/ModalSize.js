import React, { useState, useEffect } from 'react';

const ModalSize = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const [errors, setErrors] = useState({
        name: '',
    });

    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: ''
            });
        }
    }, [initialData, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
    };

    const validate = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Size is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
            // onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">
                    {mode === 'create' ? 'Create Size' : 'Update Size'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="SizeName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-300 hover:border-[#163c82] focus:border-[#163c82] outline-none rounded-lg"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name}</span>
                    )}

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

export default ModalSize;
