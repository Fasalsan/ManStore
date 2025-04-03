// import { useState } from "react";

// const OrderForm = () => {
//   const [order, setOrder] = useState({
//     customerId: "",
//     employeeId: "",
//     orderStatus: "Pending",
//     totalAmount: 0,
//     paymentStatus: "Unpaid",
//     orderItems: [{ productId: "", productName: "", quantity: 1, unitPrice: 0, totalPrice: 0 }],
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setOrder({ ...order, [e.target.name]: e.target.value });
//   };

//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItems = [...order.orderItems];
//     updatedItems[index][name] = value;
//     updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
//     setOrder({ ...order, orderItems: updatedItems });
//   };

//   const addOrderItem = () => {
//     setOrder({ ...order, orderItems: [...order.orderItems, { productId: "", productName: "", quantity: 1, unitPrice: 0, totalPrice: 0 }] });
//   };

//   const removeOrderItem = (index) => {
//     const updatedItems = order.orderItems.filter((_, i) => i !== index);
//     setOrder({ ...order, orderItems: updatedItems });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("https://your-api.com/api/order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(order),
//       });

//       if (!response.ok) throw new Error("Failed to create order");

//       const data = await response.json();
//       setMessage(`Order created successfully! Order ID: ${data.orderId}`);
//     } catch (error) {
//       setMessage("Error: " + error.message);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Create Order</h2>

//       {message && <p className="text-green-600">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="number" name="customerId" placeholder="Customer ID" value={order.customerId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
//         <input type="number" name="employeeId" placeholder="Employee ID" value={order.employeeId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />

//         <h3 className="text-lg font-bold mt-4">Order Items</h3>
//         {order.orderItems.map((item, index) => (
//           <div key={index} className="flex space-x-2">
//             <input type="number" name="productId" placeholder="Product ID" value={item.productId} onChange={(e) => handleItemChange(index, e)} className="w-1/4 p-2 border border-gray-300 rounded" required />
//             <input type="text" name="productName" placeholder="Product Name" value={item.productName} onChange={(e) => handleItemChange(index, e)} className="w-1/3 p-2 border border-gray-300 rounded" required />
//             <input type="number" name="quantity" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="w-1/6 p-2 border border-gray-300 rounded" required />
//             <input type="number" name="unitPrice" placeholder="Price" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} className="w-1/6 p-2 border border-gray-300 rounded" required />
//             <button type="button" onClick={() => removeOrderItem(index)} className="bg-red-500 text-white px-3 rounded hover:bg-red-600">X</button>
//           </div>
//         ))}

//         <button type="button" onClick={addOrderItem} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Item</button>
//         <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Submit Order</button>
//       </form>
//     </div>
//   );
// };

// export default OrderForm;


import React, { useState, useEffect } from "react";
import StandardTable from "../components/StandardTable";
import request from "../util/helper";
import { RiDeleteBin5Fill, RiEditFill } from "react-icons/ri";
import PropConfirms from "../components/PropConfirms"; // Import PropConfirm
import { toast } from "react-toastify";


const TestingCate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Full Name", key: "fullName", render: (row) => `${row.firstName} ${row.lastName}` },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
  ];


  // Fetch customers
  const getCustomer = async () => {
    try {
      const response = await request("Customer/GetAll", "get");
      setData(response);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  // Handle Edit
  const handleEdit = (row) => {
    alert(`Editing user: ${row.address}`);
  };

   // Handle Delete - Open Confirmation Modal
  const handleDelete = (row) => {
    setDeleteItem(row);
    setIsConfirming(true);
  };

  // Confirm Delete & Call API
  const DeleteCategory = async () => {
    if (!deleteItem) return;

    try {
      await request(`Customer/Delete?id=${deleteItem.id}`, "delete");
      toast.success("Customer deleted successfully!");
      await getCustomer(); // Refresh data after delete
    } catch (err) {
      toast.error("Failed to delete customer");
    } finally {
      setIsConfirming(false);
      setDeleteItem(null);
    }
  };


  // Cancel Deletion
  const cancelDelete = () => {
    setIsConfirming(false); // Close modal without deleting
    setDeleteItem(null);
  };

  // Define Actions
  const actions = [
    { icon: <RiDeleteBin5Fill />, type: "delete", onClick: handleDelete },
    { icon: <RiEditFill />, type: "edit", onClick: handleEdit },
  ];

  return (
    <div className="p-6">
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show confirmation modal if isConfirming is true */}
      {isConfirming && (
        <PropConfirms
          message={`Are you sure you want to delete ${deleteItem?.firstName} ${deleteItem?.lastName}?`}
          onConfirm={DeleteCategory}
          onCancel={cancelDelete}
        />
      )}
      {!loading && !error && <StandardTable columns={columns} data={data} actions={actions} rowsPerPage={5} />}
    </div>
  );
};

export default TestingCate;
