import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import request from "../util/helper";
import { ToastContainer, toast } from "react-toastify";


const TestingCate = () => {
  const [order, setOrder] = useState({
    customerId: "",
    employeeId: "",
    orderStatus: "Pending",
    totalAmount: 0,
    paymentStatus: "Unpaid",
    orderItems: [{ productId: "", quantity: 1, unitPrice: 0, totalPrice: 0 }],
  });

  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

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
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...order.orderItems];
    updatedItems[index][name] = value;

    // Recalculate totalPrice if either quantity or unitPrice changes
    if (name === "productId") {
      // Update the unit price and total price if product changes
      const selectedProduct = products.find((product) => product.id === value);
      if (selectedProduct) {
        updatedItems[index].unitPrice = selectedProduct.price;
        updatedItems[index].totalPrice = updatedItems[index].quantity * selectedProduct.price;
      }
    } else if (name === "quantity" || name === "unitPrice") {
      // Recalculate total price based on quantity and unitPrice changes
      const quantity = updatedItems[index].quantity;
      const unitPrice = updatedItems[index].unitPrice;
      updatedItems[index].totalPrice = quantity * unitPrice;
    }

    setOrder({ ...order, orderItems: updatedItems });
  };

  const addOrderItem = () => {
    setOrder({
      ...order,
      orderItems: [
        ...order.orderItems,
        { productId: "", quantity: 1, unitPrice: 0, totalPrice: 0 },
      ],
    });
  };

  const removeOrderItem = (index) => {
    const updatedItems = order.orderItems.filter((_, i) => i !== index);
    setOrder({ ...order, orderItems: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if orderItems are populated
      if (order.orderItems.length === 0) {
        toast.error("Please add at least one product to the order.");
        return;
      }
  
      // Send the order data to the backend (replace 'Order/Post' with your API endpoint)
      const response = await request("Order/Post", "post", order);
      
      if (response.success) {
        // Success message (you can use a toast or a similar feedback mechanism)
        toast.success("Order created successfully!");
      } else {
        toast.error("Failed to create order.");
      }
  
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Error: Unable to submit order. Please try again.");
    }
  };
  


  // Calculate the total order amount
  const totalAmount = order.orderItems.reduce((total, item) => total + item.totalPrice, 0);

  // Update the order state to reflect this
  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      totalAmount: totalAmount,
    }));
  }, [order.orderItems]); // Only trigger when orderItems change

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-xl font-bold mb-4">Create Order</h2>
      {message && <p className="text-green-600">{message}</p>}

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
          <button
            type="button"
            onClick={addOrderItem}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>

        {order.orderItems.map((item, index) => (
          <div key={index} className="flex space-x-2 items-center">
            {/* Product Dropdown */}
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

            {/* Product Price (updated when product is selected) */}
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
              className="w-1/6 p-2 border border-gray-300 rounded bg-gray-100"
            />

            <input
              type="number"
              name="quantity"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="w-1/6 p-2 border border-gray-300 rounded"
              required
            />

            <input
              type="text"
              name="totalPrice"
              placeholder="Total"
              value={`$${new Intl.NumberFormat().format(item.totalPrice)}`}
              className="w-1/6 p-2 border border-gray-300 rounded bg-gray-100"
            />

            <button
              type="button"
              onClick={() => removeOrderItem(index)}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              X
            </button>
          </div>
        ))}

        <div className="flex justify-end items-end pt-5 gap-4">
          <Link to="/salesorder">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Back
            </button>
          </Link>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestingCate;
