import React, { useState } from 'react';





const Test = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  
const data = [
  {
    "id": 49,
    "customerId": null,
    "cus_F_Name": "Test",
    "cus_L_Name": "Update",
    "employeeId": null,
    "em_F_Name": "fa",
    "em_L_Name": "sal",
    "orderDate": "2025-03-11T19:20:05.007",
    "orderStatus": "paid",
    "totalAmount": 200,
    "paymentStatus": "string",
    "orderItems": [
      {
        "id": 8,
        "orderId": 49,
        "productId": null,
        "productName": "Product005",
        "quantity": 10,
        "unitPrice": 20,
        "totalPrice": 200
      }
    ]
  }
]

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer Name</th>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Order Status</th>
              <th className="px-6 py-3">Total Amount</th>
              <th className="px-6 py-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={() => toggleRow(order.id)}
                >
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{`${order.cus_F_Name} ${order.cus_L_Name}`}</td>
                  <td className="px-6 py-4">{`${order.em_F_Name} ${order.em_L_Name}`}</td>
                  <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{order.orderStatus}</td>
                  <td className="px-6 py-4">${order.totalAmount}</td>
                  <td className="px-6 py-4">{order.paymentStatus}</td>
                </tr>
                {expandedRow === order.id && (
                  <tr>
                    <td colSpan="7" className="p-4">
                      <table className="min-w-full bg-gray-50">
                        <thead>
                          <tr>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3">Unit Price</th>
                            <th className="px-6 py-3">Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-2">{item.productName}</td>
                              <td className="px-6 py-2">{item.quantity}</td>
                              <td className="px-6 py-2">${item.unitPrice}</td>
                              <td className="px-6 py-2">${item.totalPrice}</td>
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
    </div>
  );
};

export default Test;
