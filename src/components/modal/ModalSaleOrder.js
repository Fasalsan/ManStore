import React, { useState, useEffect } from 'react';
import request from '../../util/helper';

const ModalSaleOrder = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
    // const [category, setCategory] = useState([]);
    const [customer, setCustomer] = useState([])
    const [user, setUser] = useState([])
    const [product, setProduct] = useState([]);


    const [formData, setFormData] = useState({
        customerId: '',
        createdBy: '',
        totalAmount: '',

        productId: '',
        quantity: '',
        itemPrict: ''
    });

    useEffect(() => {
        fetchCustomer();
        getUser();
        getProduct();
        if (mode === 'update' && initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: ''
            });
        }
    }, [initialData, mode]);

    const fetchCustomer = async () => {
        const response = await request("Customer/GetAll", "get")
        console.log(response)
        setCustomer(response);

    };
    // GetUser
    const getUser = async () => {
        const res = await request("User/GetAll", "get")
        setUser(res)
    }

    const getProduct = async () => {
        const response = await request("Product/GetAll", "get")
        setProduct(response)
    }


    // const fetchCategories = async () => {
    //     const response = await request("Category/GetAll", "get")
    //     setCategory(response);

    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        console.log(formData)
        // onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">
                    {mode === 'create' ? 'Create Product' : 'Update Product'}
                </h2>
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-2"
                >

                    <div className='flex w-full gap-2'>
                        {/* Customer Select Box */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Choose Customer</label>
                            <select
                                name="customerId"
                                value={formData.customerId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                            >
                                {/* <option value="">Select Category</option> */}
                                {customer.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* User Select Box */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Choose User</label>
                            <select
                                name="createdBy"
                                value={formData.createdBy}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                            >
                                {/* <option value="">Select Category</option> */}
                                {user.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                              {/* Product Select Box */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Choose Product</label>
                        <select
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            {/* <option value="">Select Category</option> */}
                            {product.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    </div>

                    <input
                        type="text"
                        placeholder='totalAmount'
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        className='w-full px-3 py-2.5 border border-gray-300 focus:border-[#f5a65d] focus:ring-2 focus:ring-[#f5a65d] hover:outline-none rounded-lg'
                    />

              
                    <input
                        type="text"
                        placeholder='quantity'
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className='w-full px-3 py-2.5 border border-gray-300 focus:border-[#f5a65d] focus:ring-2 focus:ring-[#f5a65d] hover:outline-none rounded-lg'
                    />

                    <input
                        type="text"
                        placeholder='itemPrict'
                        name="itemPrict"
                        value={formData.itemPrict}
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

export default ModalSaleOrder;
