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
        productId: "",
        unitPrice: "",
        quantity: "",
        totalPrice: ""
    });

    const [orderId, setOrderId] = useState(null); // Store orderId after submission

    const handleChange = (e) => {
        setSaleOrder({ ...saleOrder, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setOrderItem({ ...orderItem, [e.target.name]: e.target.value });
    };

    const addItem = () => {
        if (!orderItem.productId || !orderItem.unitPrice || !orderItem.quantity) {
            toast.error("Please fill all item details");
            return;
        }

        const unitPrice = parseFloat(orderItem.unitPrice);
        const quantity = parseInt(orderItem.quantity);
        const totalPrice = unitPrice * quantity;

        setSaleOrder((prevState) => ({
            ...prevState,
            items: [
                ...prevState.items,
                { productId: orderItem.productId, unitPrice, quantity, totalPrice } // No orderId yet
            ]
        }));

        setOrderItem({ productId: "", unitPrice: "", quantity: "", totalPrice: "" });
    };

    const removeItem = (index) => {
        setSaleOrder((prevState) => ({
            ...prevState,
            items: prevState.items.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request("SalesOrder/Post", "post", saleOrder);

            if (response.orderId) {
                setOrderId(response.orderId); // Store the generated orderId from backend

                // Update orderId for each item in the items list
                const updatedItems = saleOrder.items.map(item => ({
                    ...item,
                    orderId: response.orderId // Assign orderId to each item
                }));

                // Update the saleOrder with items including the orderId
                setSaleOrder((prevState) => ({
                    ...prevState,
                    items: updatedItems
                }));
            }

            toast.success("Sales Order Created Successfully!");

            // Reset the form after submission
            setSaleOrder({
                customerId: "",
                employeeId: "",
                orderDate: "",
                orderStatus: "Pending",
                paymentStatus: "Unpaid",
                items: []
            });

        } catch (error) {
            toast.error("Failed to create Sales Order");
            console.error("Error creating sales order:", error);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Create Sales Order</h2>

            {orderId && (
                <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
                    ✅ Order Created Successfully! Order ID: <strong>{orderId}</strong>
                </div>
            )}

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
                    <input type="text" name="productId" placeholder="Product Name" value={orderItem.productId} onChange={handleItemChange} className="border p-2 rounded" />
                    <input type="number" name="unitPrice" placeholder="Unit Price" value={orderItem.unitPrice} onChange={handleItemChange} className="border p-2 rounded" />
                    <input type="number" name="quantity" placeholder="Quantity" value={orderItem.quantity} onChange={handleItemChange} className="border p-2 rounded" />
                    <button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">➕ Add Item</button>
                </div>

                {saleOrder.items.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Added Items</h3>
                        {saleOrder.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-5 gap-4 mt-2 items-center">
                                <input type="text" value={item.productId} className="border p-2 rounded" disabled />
                                <input type="number" value={item.unitPrice} className="border p-2 rounded" disabled />
                                <input type="number" value={item.quantity} className="border p-2 rounded" disabled />
                                <input type="number" value={item.totalPrice} className="border p-2 rounded" disabled />
                                <button type="button" onClick={() => removeItem(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all">🗑 Remove</button>
                            </div>
                        ))}
                    </div>
                )}

                <button type="submit" className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all">✅ Submit Order</button>
            </form>
        </div>
    );
};

export default CreateSaleOrder;
