import React, { useState } from "react";

export default function TestingCate() {
  const [order, setOrder] = useState({
    id: 0,
    customerId: 0,
    employeeId: 0,
    orderDate: new Date().toISOString(),
    orderStatus: "Pending",
    totalAmount: 0,
    paymentStatus: "Unpaid",
    orderItems: [
      {
        id: 0,
        orderId: 0,
        productId: 0,
        productName: "",
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
      },
    ],
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...order.orderItems];
    updatedItems[index][field] = field === "quantity" || field === "unitPrice" ? parseFloat(value) || 0 : value;
    updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setOrder({ ...order, orderItems: updatedItems, totalAmount });
  };

  const addItem = () => {
    setOrder({
      ...order,
      orderItems: [
        ...order.orderItems,
        {
          id: order.orderItems.length,
          orderId: order.id,
          productId: 0,
          productName: "",
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
        },
      ],
    });
  };

  const handleSubmit = () => {
    console.log("Order submitted:", order);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

          <h2 className="text-xl font-semibold">Sales Order</h2>

          {order.orderItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                placeholder="Product Name"
                value={item.productName}
                onChange={(e) => handleItemChange(index, "productName", e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
              />
              <div className="flex items-center font-medium">
                Total: ${item.totalPrice.toFixed(2)}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button onClick={addItem}>Add Item</button>
            <div className="text-lg font-semibold">Total Amount: ${order.totalAmount.toFixed(2)}</div>
          </div>

          <button className="w-full" onClick={handleSubmit}>
            Submit Order
          </button>

    </div>
  );
}