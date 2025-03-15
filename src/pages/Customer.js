import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import request from '../util/helper';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Propconfirm from "../components/Propconfirm";
import ModalCustomer from '../components/modal/ModalCustomer';

export default function Customer() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [propconfirm, setPropconfirm] = useState(false);
    const [isId, setIsId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [customr, setCustomer] = useState([]);
    const itemsPerPage = 5;

    const handleCreate = () => {
        setIsEditMode(false);
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdits = (item) => {
        setIsEditMode(true);
        setSelectedData(item);
        setIsModalOpen(true);
        setIsId(item.id);
    };

    const handlOpenPropconfirm = (id) => {
        setIsId(id);
        setPropconfirm(true);
    };

    useEffect(() => {
        getCustomer();
    }, []);

    const getCustomer = async () => {
        try {
            const response = await request("Customer/GetAll", "get");
            setCustomer(response);
        } catch (error) {
            toast.error("Failed to fetch customers");
        }
    };

    const CreateCustomer = async (data) => {
        try {
            await request(`Customer/Post`, "post", data);
            toast.success("Customer created successfully!");
            await getCustomer();
        } catch (error) {
            toast.error("Failed to create customer");
        }
    };

    const UpdateCategory = async (data) => {
        const id = isId;
        try {
            await request(`Customer/Update?id=${id}`, "Put", data);
            toast.success("Customer updated successfully!");
            await getCustomer();
        } catch (error) {
            toast.error("Failed to update customer");
        }
    };

    const DeleteCategory = async () => {
        const id = isId;
        try {
            await request(`Customer/Delete?id=${id}`, "delete");
            toast.error("Customer deleted successfully!");
            await getCustomer();
        } catch (err) {
            toast.error("Failed to delete customer");
        }
    };

    const RemoveCategory = async () => {
        setPropconfirm(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await DeleteCategory();
    };

    const handleSubmit = async (data) => {
        setIsModalOpen(false);
        if (isEditMode) {
            await UpdateCategory(data);
        } else {
            await CreateCustomer(data);
        }
    };

    const totalPages = Math.ceil(customr.length / itemsPerPage);
    const currentData = customr.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredData = currentData.filter(item =>
        item.firstName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className='flex justify-between items-center bg-white px-4 py-4 mb-4 shadow-md'>
                <input
                    type="text"
                    placeholder='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-[25%] px-3 py-2.5 border border-gray-300 hover:border-[#163c82] focus:border-[#163c82] outline-none rounded-lg'
                />
                <button
                    onClick={handleCreate}
                    className='bg-[#163c82] px-12 py-2 rounded-lg text-white shadow-lg'
                >Add+</button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-center">ID</th>
                            <th className="px-6 py-4 text-center">Name</th>
                            <th className="px-6 py-4 text-center">Phone</th>
                            <th className="px-6 py-4 text-center">Address</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, i) => (
                                <tr key={item.id}
                                    className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 text-center"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">{i + 1}</td>
                                    <td>{item.firstName + " " + item.lastName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className='flex gap-4 justify-center'>
                                            <RiDeleteBin5Fill
                                                onClick={() => handlOpenPropconfirm(item.id)}
                                                className='text-red-600 text-[20px] cursor-pointer'
                                            />
                                            <RiEditFill
                                                onClick={() => handleEdits(item)}
                                                className='text-green-600 text-[20px] cursor-pointer'
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className='text-red-600 text-center py-4'>No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${currentPage === page ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-200"}`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
                >
                    Next
                </button>
            </div>

            {/* Propconfirm */}
            <Propconfirm isOpenProp={propconfirm}>
                <div className="flex flex-col gap-7">
                    <p>Are you sure you want to delete this customer?</p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={RemoveCategory}
                            className="bg-blue-600 px-9 py-2 text-white rounded-lg">Yes</button>
                        <button
                            onClick={() => setPropconfirm(false)}
                            className="bg-red-600 px-9 py-2 text-white rounded-lg">No</button>
                    </div>
                </div>
            </Propconfirm>

            {/* Modal */}
            <ModalCustomer
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedData}
                mode={isEditMode ? 'update' : 'create'}
            />
        </div>
    );
}