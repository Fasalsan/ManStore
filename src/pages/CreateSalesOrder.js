import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../util/helper";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Button from "../components/Button";

const CreateSalesOrder = () => {
    const [order, setOrder] = useState({
        customerId: "",
        employeeId: "",
        orderStatus: "Pending",
        totalAmount: 0,
        paymentStatus: "Unpaid",
        orderItems: [{ productId: 0, productName: "", quantity: "", unitPrice: 0, totalPrice: 0 }],
    });

    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersData = await request("Customer/GetAll", "get");
                const employeesData = await request("Employee/GetAll", "get");
                const productsData = await request("Product/GetAll", "get");
                setCustomers(customersData);
                setEmployees(employeesData);
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: name === "customerId" || name === "employeeId" ? Number(value) : value,
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...order.orderItems];
        const parsedValue = ["productId", "quantity", "unitPrice"].includes(name)
            ? Number(value)
            : value;

        items[index][name] = parsedValue;

        if (name === "productId") {
            const selectedProduct = products.find((p) => p.id === parsedValue);
            if (selectedProduct) {
                items[index].unitPrice = selectedProduct.price;
                items[index].totalPrice = items[index].quantity * selectedProduct.price;
            }
        }

        if (name === "quantity" || name === "unitPrice") {
            const quantity = Number(items[index].quantity);
            const unitPrice = Number(items[index].unitPrice);
            items[index].totalPrice = quantity * unitPrice;
        }

        setOrder({ ...order, orderItems: items });
    };

    const addOrderItem = () => {
        setOrder({
            ...order,
            orderItems: [...order.orderItems, { productId: 0, productName: "", quantity: '', unitPrice: 0, totalPrice: 0 }],
        });
    };

    const removeOrderItem = (index) => {
        const updatedItems = order.orderItems.filter((_, i) => i !== index);
        setOrder({ ...order, orderItems: updatedItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (order.orderItems.length === 0) {
            toast.error("Please add at least one product.");
            return;
        }

        try {
            console.log("Submitting order:", order);

            const response = await axios.post("https://localhost:7017/api/SalesOrder/Post", order);

            if (response && response.data) {
                toast.success("Order created successfully!");
                setTimeout(() => navigate("/salesorder"), 1500);
            } else {
                toast.error("Failed to create order.");
            }
        } catch (error) {
            console.error("Submit error:", error);
            toast.error(
                error.response?.data?.message || "Error submitting order. Please try again."
            );
        }
    };


    const totalAmount = order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

    useEffect(() => {
        setOrder((prev) => ({
            ...prev,
            totalAmount,
        }));
    }, [order.orderItems]);

    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <ToastContainer position="top-right" autoClose={3000} />

            <h2 className="text-xl font-bold mb-4">Create Order</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <select
                        name="customerId"
                        value={order.customerId}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Customer</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.firstName} {c.lastName}
                            </option>
                        ))}
                    </select>

                    <select
                        name="employeeId"
                        value={order.employeeId}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.firstName} {e.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4">
                    <input
                        type="date"
                        name="orderDate"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <select
                        name="paymentStatus"
                        value={order.paymentStatus}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>

                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold mt-4">Order Items</h3>
                    <Button onClick={addOrderItem}>Add Item</Button>
                </div>

                {order.orderItems.map((item, index) => (
                    <div key={index} className="flex space-x-2 items-center">
                        <select
                            name="productId"
                            value={item.productId}
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-1/3 p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Product</option>
                            {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            name="unitPrice"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-1/6 p-2 border border-gray-300 rounded bg-gray-100"
                            readOnly
                        />

                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-1/6 p-2 border border-gray-300 rounded"
                            required
                        />

                        <input
                            type="text"
                            name="totalPrice"
                            value={`$${item.totalPrice.toFixed(2)}`}
                            className="w-1/6 p-2 border border-gray-300 rounded bg-gray-100"
                            readOnly
                        />

                        <button
                            type="button"
                            onClick={() => removeOrderItem(index)}
                            className="text-red-600 p-3 rounded-full border-2 w-[4%] h-[4%] border-red-600 hover:bg-red-100 hover:border-red-700 transition duration-200"
                        >
                            X
                        </button>

                    </div>
                ))}

                <div className="text-right font-bold pt-4">
                    Total: ${order.totalAmount.toFixed(2)}
                </div>

                <div className="flex justify-end gap-4">
                    <Link to="/salesorder">
                        <Button variant="danger"> Back </Button>
                    </Link>
                    <button type="submit" className="bg-[#163c82] text-white px-4 py-2 rounded hover:bg-blue-700">
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSalesOrder;
