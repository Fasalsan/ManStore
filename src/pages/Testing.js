import React, { useState } from "react";

const Testing = () => {
    const [openRow, setOpenRow] = useState(null);

    const toggleRow = (productId) => {
        setOpenRow(openRow === productId ? null : productId);
    };

    const products = [
        {
            id: 1,
            customer: "John Doe",
            employee: "Jane Smith",
            orderDate: "2025-02-20",
            status: "Pending",
            totalAmount: "$150.00",
            paymentStatus: "Unpaid",
            items: [
                { name: "Laptop", quantity: 1, price: "$120.00" },
                { name: "Mouse", quantity: 2, price: "$15.00" },
            ],
        },
        {
            id: 2,
            customer: "Alice Johnson",
            employee: "Mark Lee",
            orderDate: "2025-02-18",
            status: "Shipped",
            totalAmount: "$320.50",
            paymentStatus: "Paid",
            items: [
                { name: "Phone", quantity: 1, price: "$300.00" },
                { name: "Charger", quantity: 1, price: "$20.50" },
            ],
        },
        {
            id: 3,
            customer: "Michael Brown",
            employee: "Sarah Davis",
            orderDate: "2025-02-15",
            status: "Delivered",
            totalAmount: "$75.99",
            paymentStatus: "Paid",
            items: [
                { name: "Headphones", quantity: 1, price: "$50.00" },
                { name: "Case", quantity: 1, price: "$25.99" },
            ],
        },
        {
            id: 4,
            customer: "Emma Wilson",
            employee: "David White",
            orderDate: "2025-02-10",
            status: "Canceled",
            totalAmount: "$0.00",
            paymentStatus: "Refunded",
            items: [
                { name: "Smartwatch", quantity: 1, price: "$200.00" },
            ],
        },
        {
            id: 5,
            customer: "Chris Taylor",
            employee: "Laura Martin",
            orderDate: "2025-02-05",
            status: "Processing",
            totalAmount: "$210.75",
            paymentStatus: "Pending",
            items: [
                { name: "Keyboard", quantity: 1, price: "$100.00" },
                { name: "Monitor", quantity: 1, price: "$110.75" },
            ],
        },
    ];

    return (
        <div className="container mx-auto p-5">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">#</th>
                        <th className="py-2 px-4 border">View</th>
                        <th className="py-2 px-4 border">Customer</th>
                        <th className="py-2 px-4 border">Employee</th>
                        <th className="py-2 px-4 border">Order Date</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Total Amount</th>
                        <th className="py-2 px-4 border">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <React.Fragment key={product.id}>
                            {/* Main Order Row */}
                            <tr
                                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                onClick={() => toggleRow(product.id)}
                            >
                                <td className="py-2 px-4 border text-center">{product.id}</td>
                                <td className="py-2 px-4 border text-center">
                                    {openRow === product.id ? "▲" : "▼"}
                                </td>
                                <td className="py-2 px-4 border">{product.customer}</td>
                                <td className="py-2 px-4 border">{product.employee}</td>
                                <td className="py-2 px-4 border">{product.orderDate}</td>
                                <td className="py-2 px-4 border">{product.status}</td>
                                <td className="py-2 px-4 border">{product.totalAmount}</td>
                                <td className="py-2 px-4 border">{product.paymentStatus}</td>
                            </tr>

                            {/* Expandable Order Items */}
                            {openRow === product.id && (
                                <tr className="bg-gray-50">
                                    <td colSpan="8" className="py-2 px-4 border">
                                        <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
                                            <thead>
                                                <tr className="bg-gray-300">
                                                    <th className="py-2 px-4 border">Item</th>
                                                    <th className="py-2 px-4 border">Quantity</th>
                                                    <th className="py-2 px-4 border">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.items.map((item, index) => (
                                                    <tr key={index} className="bg-white hover:bg-gray-200">
                                                        <td className="py-2 px-4 border">{item.name}</td>
                                                        <td className="py-2 px-4 border">{item.quantity}</td>
                                                        <td className="py-2 px-4 border">{item.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Testing;
