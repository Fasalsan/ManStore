import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import request from "../util/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Propconfirm from "../components/Propconfirm";
import ModalBrand from "../components/modal/ModalBrand";
import Button from "../components/Button";

export default function Brand() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [propconfirm, setPropconfirm] = useState(false);
    const [isId, setIsId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [brand, setBrand] = useState([]);
    const itemsPerPage = 3;

    useEffect(() => {
        getBrand();
    }, []);

    const getBrand = async () => {
        const response = await request("Brand/GetAll", "get");
        setBrand(response);
    };

    const CreateBrand = async (data) => {
        try {
            await request(`Brand/Post`, "post", data);
            toast.success("Brand created successfully!");
            await getBrand();
        } catch (error) {
            console.error(error);
        }
    };

    const UpdateCategory = async (data) => {
        const id = isId;
        try {
            await request(`Brand/Update?id=${id}`, "Put", data);
            toast.success("Brand updated successfully!");
            await getBrand();
        } catch (error) {
            console.error(error);
        }
    };

    const DeleteCategory = async () => {
        const id = isId;
        try {
            await request(`Brand/Delete?id=${id}`, "delete");
            toast.error("Brand deleted successfully!");
            await getBrand();
        } catch (err) {
            console.error(err);
        }
    };

    const RemoveCategory = async () => {
        setPropconfirm(false);
        await DeleteCategory();
    };

    const handleSubmit = async (data) => {
        setIsModalOpen(false);
        if (isEditMode) {
            await UpdateCategory(data);
        } else {
            await CreateBrand(data);
        }
    };

    const totalPages = Math.ceil(brand.length / itemsPerPage);
    const currentData = brand.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredData = currentData.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddItem = () => {
        setIsEditMode(false);
        setSelectedData(null);
        setIsModalOpen(true);
    }

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex justify-between items-center bg-white px-4 py-4 mb-4 shadow-md">
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[25%] px-3 py-2.5 border border-gray-300 hover:border-[#163c82] focus:border-[#163c82] outline-none rounded-lg"
                />
                <Button onClick={() => handleAddItem()}>Add new +</Button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-center">ID</th>
                            <th className="px-6 py-4 text-center">Name</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, i) => (
                                <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 text-center">
                                    <td className="px-6 py-4 font-medium text-gray-900">{i + 1}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex gap-4 justify-center">
                                            <RiDeleteBin5Fill
                                                onClick={() => {
                                                    setIsId(item.id);
                                                    setPropconfirm(true);
                                                }}
                                                className="text-red-600 text-[20px] cursor-pointer"
                                            />
                                            <RiEditFill
                                                onClick={() => {
                                                    setIsEditMode(true);
                                                    setSelectedData(item);
                                                    setIsModalOpen(true);
                                                    setIsId(item.id);
                                                }}
                                                className="text-green-600 text-[20px] cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-red-600 text-3xl">No data found</td>
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
                    className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white hover:bg-gray-200"
                        }`}
                >
                    Previous
                </button>

                {/* Generate page numbers dynamically */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-white hover:bg-gray-200"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg ${currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white hover:bg-gray-200"
                        }`}
                >
                    Next
                </button>
            </div>

            <Propconfirm isOpenProp={propconfirm}>
                <div className="flex flex-col gap-7">
                    <p>Are you sure you want to delete this brand?</p>
                    <div className="flex justify-end gap-2">
                        <Button className="px-6 py-2" variant="danger" onClick={() => setPropconfirm(false)}>No</Button>
                        <Button className="px-6 py-2" onClick={() => RemoveCategory()}>Yes</Button>

                    </div>
                </div>
            </Propconfirm>
            <ModalBrand
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedData}
                mode={isEditMode ? "update" : "create"}
            />
        </div>
    );
}
