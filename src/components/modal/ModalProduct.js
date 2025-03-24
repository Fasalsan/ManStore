import React, { useState, useEffect } from 'react';
import FormInputStyle from '../styel/formInputStyel';
import request from '../../util/helper';
import Button from '../Button';

const ModalProduct = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
    const [brand, setBrand] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        cost: '',
        brandId: '',
        colorId: '',
        sizeId: ''
    });

    useEffect(() => {
        fetchDropdownData();
        if (mode === 'update' && initialData) {
            console.log('Initial Data for Update:', initialData);  // Log initialData

            setFormData({
                name: initialData.name || '',
                price: initialData.price || '',
                quantity: initialData.quantity || '',
                cost: initialData.cost || '',
                brandId: initialData.brandModel ? String(initialData.brandModel.id) : '',
                colorId: initialData.colorModel ? String(initialData.colorModel.id) : '',
                sizeId: initialData.sizeModel ? String(initialData.sizeModel.id) : ''
            });
        } else {
            resetForm();
        }
    }, [initialData, mode]);

    const fetchDropdownData = async () => {
        try {
            const [brandData, colorData, sizeData] = await Promise.all([
                request("Brand/GetAll", "get"),
                request("Color/GetAll", "get"),
                request("Size/GetAll", "get")
            ]);

            console.log('Brand Data:', brandData);  // Log brand data
            console.log('Color Data:', colorData);  // Log color data
            console.log('Size Data:', sizeData);    // Log size data

            setBrand(brandData);
            setColor(colorData);
            setSize(sizeData);
        } catch (error) {
            console.error("Error fetching dropdown data:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            quantity: '',
            cost: '',
            brandId: '',
            colorId: '',
            sizeId: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        console.log(formData);
        // onClose(); // Optionally close the modal after submit
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[50%]">
                <h2 className="text-xl font-bold mb-4">
                    {mode === 'create' ? 'Create Product' : 'Update Product'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder='Name'
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />
                        <input
                            type="number"
                            placeholder='Price'
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="number"
                            placeholder='Quantity'
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />
                        <input
                            type="number"
                            placeholder='Cost'
                            name="cost"
                            value={formData.cost}
                            onChange={handleChange}
                            className={FormInputStyle}
                        />
                    </div>
                    {/* Category Select Box */}
                    <div className='flex gap-4'>
                        <select
                            name="brandId"
                            value={formData.brandId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            <option value="">Select Brand</option>
                            {brand?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="colorId"
                            value={formData.colorId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            <option value="">Select Color</option>
                            {color?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="sizeId"
                            value={formData.sizeId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            <option value="">Select Size</option>
                            {size?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button className="px-4 py-2" variant="danger" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="px-4 py-2">
                            {mode === 'create' ? 'Create' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalProduct;
