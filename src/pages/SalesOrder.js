import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill, RiEditFill } from "react-icons/ri";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import request from "../util/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const SaleOrder = () => {
    const [openRow, setOpenRow] = useState(null);
    const [saleOrder, setSaleOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 5;

    useEffect(() => {
        getSaleOrder();
    }, []);

    const formatData = (data) => {
        return data.map((order) => ({
            ...order,
            orderDate: new Date(order.orderDate).toLocaleDateString(),
            totalAmount: `$${order.totalAmount?.toFixed(2) || "0.00"}`,
            items: (order.orderItemModels || []).map((item) => ({
                ...item,
                UnitPrice: `$${item.unitPrice?.toFixed(2) || "0.00"}`,
                TotalAmount: `$${(item.unitPrice * item.quantity)?.toFixed(2) || "0.00"}`,
            })),
        }));
    };

    const getSaleOrder = async () => {
        try {
            const response = await request("SalesOrder/GetAll", "get");
            console.log("API Response:", response); // DEBUG
            if (Array.isArray(response)) {
                const formattedData = formatData(response);
                console.log("Formatted Data:", formattedData); // DEBUG
                setSaleOrder(formattedData);
            } else {
                toast.error("Unexpected data format received from API.");
            }
        } catch (error) {
            console.error("Error fetching sale orders:", error);
            toast.error("Failed to fetch sale orders.");
        }
    };

    const toggleRow = (orderId) => {
        setOpenRow(openRow === orderId ? null : orderId);
    };

    const filteredData = saleOrder.filter((item) =>
        item.customerId?.toString().toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <ToastContainer />
            <div className="flex justify-between items-center bg-white px-4 py-4 mb-4 shadow-md">
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[25%] px-3 py-2.5 border border-gray-300 hover:border-[#163c82] focus:border-[#163c82] outline-none rounded-lg"
                />
                <Link
                    to={"/dashboard/createSalesOrder"}
                    className="bg-[#163c82] px-12 py-2 rounded-lg text-white shadow-lg"
                >
                    Add+
                </Link>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-center">#</th>
                            <th className="px-6 py-4 text-center">View</th>
                            <th className="px-6 py-4 text-center">Customer</th>
                            <th className="px-6 py-4 text-center">Employee</th>
                            <th className="px-6 py-4 text-center">Order Date</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Total Amount</th>
                            <th className="px-6 py-4 text-center">Payment Status</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((so, i) => (
                            <React.Fragment key={so.id}>
                                <tr
                                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => toggleRow(so.id)}
                                >
                                    <td className="px-6 py-4 text-center font-bold">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                    <td className="px-6 py-4 text-center">
                                        {openRow === so.id ? (
                                            <MdKeyboardArrowUp className="w-6 h-6 text-gray-700 inline-block" />
                                        ) : (
                                            <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500 inline-block" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">{so.c_F_Name} {so.c_L_Name}</td>
                                    <td className="px-6 py-4 text-center">{so.e_F_Name} {so.e_L_Name}</td>
                                    <td className="px-6 py-4 text-center">{so.orderDate}</td>
                                    <td className="px-6 py-4 text-center">{so.orderStatus}</td>
                                    <td className="px-6 py-4 text-center">{so.totalAmount}</td>
                                    <td className="px-6 py-4 text-center">{so.paymentStatus}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex gap-4 justify-center">
                                            <RiDeleteBin5Fill className="text-red-600 text-[20px] cursor-pointer" />
                                            <RiEditFill className="text-green-600 text-[20px] cursor-pointer" />
                                        </div>
                                    </td>
                                </tr>

                                {openRow === so.id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="9" className="py-2 px-4 border border-gray-300">
                                            <table className="w-full bg-gray-100 border-collapse border border-gray-300 rounded-lg">
                                                <thead>
                                                    <tr className="bg-gray-300">
                                                        <th className="py-2 px-4 text-center">#</th>
                                                        <th className="py-2 px-4 text-center">Order ID</th>
                                                        <th className="py-2 px-4 text-center">Product</th>
                                                        <th className="py-2 px-4 text-center">Unit Price</th>
                                                        <th className="py-2 px-4 text-center">Quantity</th>
                                                        <th className="py-2 px-4 text-center">Total Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {so.items.map((item, index) => (
                                                        <tr key={item.id || index} className="bg-white hover:bg-gray-200">
                                                            <td className="py-2 px-4 text-center font-bold">{index + 1}</td>
                                                            <td className="py-2 px-4 text-center">{item.orderId}</td>
                                                            <td className="py-2 px-4 text-center">{item.productName}</td>
                                                            <td className="py-2 px-4 text-center">{item.UnitPrice}</td>
                                                            <td className="py-2 px-4 text-center">{item.quantity}</td>
                                                            <td className="py-2 px-4 text-center">{item.TotalAmount}</td>
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

            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 border border-gray-300 rounded-lg bg-white hover:bg-gray-200 disabled:bg-gray-300"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${currentPage === page ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-200"}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 border border-gray-300 rounded-lg bg-white hover:bg-gray-200 disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SaleOrder;
