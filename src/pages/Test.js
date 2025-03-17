// import React, { useState } from 'react';

// const Test = () => {
//   const [expandedRow, setExpandedRow] = useState(null);
  
// const data = [
//   {
//     "id": 49,
//     "customerId": null,
//     "cus_F_Name": "Test",
//     "cus_L_Name": "Update",
//     "employeeId": null,
//     "em_F_Name": "fa",
//     "em_L_Name": "sal",
//     "orderDate": "2025-03-11T19:20:05.007",
//     "orderStatus": "paid",
//     "totalAmount": 200,
//     "paymentStatus": "string",
//     "orderItems": [
//       {
//         "id": 8,
//         "orderId": 49,
//         "productId": null,
//         "productName": "Product005",
//         "quantity": 10,
//         "unitPrice": 20,
//         "totalPrice": 200
//       }
//     ]
//   }
// ]

//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-700 text-white">
//               <th className="px-6 py-3">Order ID</th>
//               <th className="px-6 py-3">Customer Name</th>
//               <th className="px-6 py-3">Employee Name</th>
//               <th className="px-6 py-3">Order Date</th>
//               <th className="px-6 py-3">Order Status</th>
//               <th className="px-6 py-3">Total Amount</th>
//               <th className="px-6 py-3">Payment Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((order) => (
//               <React.Fragment key={order.id}>
//                 <tr
//                   className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => toggleRow(order.id)}
//                 >
//                   <td className="px-6 py-4">{order.id}</td>
//                   <td className="px-6 py-4">{`${order.cus_F_Name} ${order.cus_L_Name}`}</td>
//                   <td className="px-6 py-4">{`${order.em_F_Name} ${order.em_L_Name}`}</td>
//                   <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
//                   <td className="px-6 py-4">{order.orderStatus}</td>
//                   <td className="px-6 py-4">${order.totalAmount}</td>
//                   <td className="px-6 py-4">{order.paymentStatus}</td>
//                 </tr>
//                 {expandedRow === order.id && (
//                   <tr>
//                     <td colSpan="7" className="p-4">
//                       <table className="min-w-full bg-gray-50">
//                         <thead>
//                           <tr>
//                             <th className="px-6 py-3">Product Name</th>
//                             <th className="px-6 py-3">Quantity</th>
//                             <th className="px-6 py-3">Unit Price</th>
//                             <th className="px-6 py-3">Total Price</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {order.orderItems.map((item) => (
//                             <tr key={item.id}>
//                               <td className="px-6 py-2">{item.productName}</td>
//                               <td className="px-6 py-2">{item.quantity}</td>
//                               <td className="px-6 py-2">${item.unitPrice}</td>
//                               <td className="px-6 py-2">${item.totalPrice}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Test;




import React from "react";


const Test = () => {
  return (
    <div
    className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url("https://cdn.oneesports.gg/cdn-data/2024/10/MLBB_Granger_Exorcist.jpg")' }}
  >
    <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm transition-all duration-500"></div>

    <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-white mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-white/80 text-black hover:bg-white font-semibold py-2 rounded-xl"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-white text-center mt-4">
        Don't have an account?{' '}
        <a href="/register" className="text-white underline hover:text-blue-200">
          Register here
        </a>
      </p>
    </div>
  </div>
  
  );
};

export default Test;

