import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from "../util/helper";

const CreateSaleOrder = () => {
    const [saleOrder, setSaleOrder] = useState({
        customerId: "",
        employeeId: "",
        orderDate: "",
        orderStatus: "Pending",
        paymentStatus: "Unpaid",
        items: []
    });

    const [orderItem, setOrderItem] = useState({
        productName: "",
        unitPrice: "",
        quantity: ""
    });

    const handleChange = (e) => {
        setSaleOrder({ ...saleOrder, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setOrderItem({ ...orderItem, [e.target.name]: e.target.value });
    };

    const addItem = () => {
        if (!orderItem.productName || !orderItem.unitPrice || !orderItem.quantity) {
            toast.error("Please fill all item details");
            return;
        }
        setSaleOrder({
            ...saleOrder,
            items: [...saleOrder.items, { ...orderItem, unitPrice: parseFloat(orderItem.unitPrice), quantity: parseInt(orderItem.quantity) }]
        });
        setOrderItem({ productName: "", unitPrice: "", quantity: "" });
    };

    const removeItem = (index) => {
        const newItems = saleOrder.items.filter((_, i) => i !== index);
        setSaleOrder({ ...saleOrder, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await request("SaleOrder/Create", "post", saleOrder);
        //     toast.success("Sales Order Created Successfully!");
        // } catch (error) {
        //     toast.error("Failed to create Sales Order");
        //     console.error("Error creating sales order:", error);
        // }

        console.log(saleOrder)
    };

    return (
        <div className="container mx-auto p-5">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Create Sales Order</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="customerId" placeholder="Customer ID" value={saleOrder.customerId} onChange={handleChange} className="border p-2 rounded" required />
                    <input type="text" name="employeeId" placeholder="Employee ID" value={saleOrder.employeeId} onChange={handleChange} className="border p-2 rounded" required />
                    <input type="date" name="orderDate" value={saleOrder.orderDate} onChange={handleChange} className="border p-2 rounded" required />
                    <select name="orderStatus" value={saleOrder.orderStatus} onChange={handleChange} className="border p-2 rounded">
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <select name="paymentStatus" value={saleOrder.paymentStatus} onChange={handleChange} className="border p-2 rounded">
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                
                <h3 className="mt-4 text-lg font-bold">Order Items</h3>
                <div className="grid grid-cols-4 gap-4 mt-2 items-center">
                    <input type="text" name="productName" placeholder="Product Name" value={orderItem.productName} onChange={handleItemChange} className="border p-2 rounded" required />
                    <input type="number" name="unitPrice" placeholder="Unit Price" value={orderItem.unitPrice} onChange={handleItemChange} className="border p-2 rounded" required />
                    <input type="number" name="quantity" placeholder="Quantity" value={orderItem.quantity} onChange={handleItemChange} className="border p-2 rounded" required />
                    <button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">➕ Add Item</button>
                </div>
                {saleOrder.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 mt-2 items-center">
                        <input type="text" name="productName" placeholder="Product Name" value={item.productName} className="border p-2 rounded" disabled />
                        <input type="number" name="unitPrice" placeholder="Unit Price" value={item.unitPrice} className="border p-2 rounded" disabled />
                        <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} className="border p-2 rounded" disabled />
                        <button type="button" onClick={() => removeItem(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all">🗑 Remove</button>
                    </div>
                ))}
                <button type="submit" className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all">✅ Submit Order</button>
            </form>
        </div>
    );
};

export default CreateSaleOrder;