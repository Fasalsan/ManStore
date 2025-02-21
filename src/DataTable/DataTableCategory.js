import React, { useState } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import request from '../util/helper';
import Loading from "../components/shared/Loading";
import ModalCategory from '../components/modal/ModalCategory';
import Propconfirm from "../components/Propconfirm";

export default function DataTableCategory({ data, itemsPerPage, reloadCategory }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [propconfirm, setPropconfirm] = useState(false);
    const [isId, setIsId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleCreate = () => {
        setIsEditMode(false);
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdits = (item) => {
        setIsEditMode(true);
        setSelectedData(item);
        setIsModalOpen(true);
        setIsId(item.id)
    };

    // handlOpenPropconfirm
    const handlOpenPropconfirm = (id) => {
        setIsId(id)
        setPropconfirm(true)
    }

    // CreateNewCategory
    const CreateCategory = (data) => {
        try {
            request(`Category/Post`, "post", data)
            reloadCategory();
        } catch (error) {
            console.error(error);
        }
    }
    // UpadateCategory
    const UpdateCategory = (data) => {
        const id = isId
        try {
            request(`Category/Update?id=${id}`, "Put", data)
            reloadCategory();
        } catch (error) {
            console.error(error);
        }
    }

    // RemoveCategory
    const DeleteCategory = async () => {
        const id = isId
        try {
            await request(`Category/Delete?id=${id}`, "delete",)
            reloadCategory();
            setLoading(false);
        } catch (err) {

        }
    }

    // onConfirmRemoveCategory
    const RemoveCategory = async () => {
        setLoading(true);
        setPropconfirm(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        DeleteCategory();
    }

        // FormSubmit
        const handleSubmit = async (data) => {
            setIsModalOpen(false)
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if (isEditMode) {
                UpdateCategory(data);
                setLoading(false);
                reloadCategory();
    
            } else {
                await CreateCategory(data);
                setLoading(false);
                reloadCategory();
            }
        }


    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get the data for the current page
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filter the data based on the search term
    const filteredData = currentData.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) // Use optional chaining (?.) to check if 'name' exists
    );
    return (
        <div>

            <div className='flex justify-between items-center bg-white px-4 py-4 mb-4 shadow-md'>

                {loading && (<Loading />)}
                <input type="text"
                    placeholder='Search By Name'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='border border-[#f5a65d] w-[25%] px-4 py-2 focus:outline-none rounded-lg'
                />

                <button
                    // onClick={() => setModalCreate(true)}
                    onClick={handleCreate}
                    className='bg-[#f5a65d] px-12 py-2 rounded-lg text-white'
                >Add+</button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CategoryName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                                    <td>{item.name}</td> 
                                    <td className="px-6 py-4">
                                        <div className='flex gap-4'>
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
                            <div className='flex justify-center items-center w-full p-12'>
                                <h1 className='text-red-600 text-3xl'> No data found</h1>
                            </div>
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


            {/* Propconfirm */}
            <Propconfirm isOpenProp={propconfirm}>
                <div className="flex flex-col gap-7">
                    <p>Are you Sure to delete this task!</p>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={RemoveCategory}
                            className="bg-blue-600 px-9 py-2
                            text-white rounded-lg">Yes</button>
                        <button
                            onClick={() => setPropconfirm(false)}
                            className="bg-red-600 px-9 py-2 text-white rounded-lg">No</button>
                    </div>
                </div>
            </Propconfirm>
            {/* Modal */}
            <ModalCategory
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedData}
                mode={isEditMode ? 'update' : 'create'}
            />
        </div>
    )
}
