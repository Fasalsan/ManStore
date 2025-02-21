import { useEffect, useState } from 'react';
import request from '../util/helper';
import Loading from "../components/shared/Loading";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import Propconfirm from '../components/Propconfirm';
import ModalSaleOrder from '../components/modal/ModalSaleOrder';

export default function SalesOrder() {
    const [salesOrder, setSalesOrder] = useState([]);
    const [propconfirm, setPropconfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isId, setIsId] = useState()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        fetchCustomer();
        getSalesOrder();
    }, []);


    const handleCreate = () => {
        setIsEditMode(false);
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const fetchCustomer = async () => {
        const response = await request("Customer/GetAll", "get")
        console.log(response)
        // setCustomer(response);

    };

    const handleEdits = (item) => {
        setIsEditMode(true);
        setSelectedData(item);
        setIsModalOpen(true);
        setIsId(item.id)
    };

    const getSalesOrder = async () => {
        const response = await request("SalesOrder/GetAll", "get")
        setSalesOrder(response)
        // console.log(response)
    }

      // CreateNewProduct
      const CreateSaleOrder = async (data) => {
          try {
              await request(`SalesOrder/Save`, "post", data)
              await getSalesOrder();
          } catch (error) {
              console.error(error);
          }
      }

    // handlOpenPropconfirm
    const handlOpenPropconfirm = (id) => {
        setIsId(id)
        setPropconfirm(true)
    }

    // RemoveProduct
    const handleDeleteSale = async () => {
        const id = isId
        try {
            await request(`SalesOrder/Delete/${id}`, "delete",)
            await getSalesOrder();
            setLoading(false);
        } catch (err) {

        }
    }

    // onConfirmRemoveProduct
    const handleDeleteSaleOrder = async () => {
        setLoading(true);
        setPropconfirm(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        handleDeleteSale();
    }

    const ViewDetail = () => {
        alert("View Detail")
    }



    // FormSubmit
    const handleSubmit = async (data) => {
        setIsModalOpen(false)
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (isEditMode) {
            getSalesOrder(data);
            await getSalesOrder();
            setLoading(false);

        } else {
            await CreateSaleOrder(data);
            await getSalesOrder();
            setLoading(false);
        }
    }

    return (
        <>
            <div className='flex justify-between items-center bg-white px-4 py-4 mb-4 shadow-md'>

                {loading && (<Loading />)}
                <input type="text"
                    placeholder='Search By Name'
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
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
                                CreatBy
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                OrderDate
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TotalAmount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salesOrder && salesOrder.map((item, i) => (
                                <tr key={item.orderId}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{i + 1}</td>
                                    <td>{item.createdByName}</td>
                                    <td>{item.customerName}</td>
                                    <td>{item.orderDate}</td>
                                    <td>{item.totalAmount}</td>
                                    <td className="px-6 py-4">
                                        <div className='flex gap-4'>
                                            <RiDeleteBin5Fill
                                                onClick={() => handlOpenPropconfirm(item.orderId)}
                                                // onClick={() => alert(item.orderId)}
                                                className='text-red-600 text-[20px] cursor-pointer'
                                            />
                                            <RiEditFill
                                                onClick={() => handleEdits(item)}
                                                className='text-green-600 text-[20px] cursor-pointer'
                                            />
                                            <IoEye
                                                className='text-gray-600 text-[20px] cursor-pointer'
                                                onClick={ViewDetail}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


                {/* Propconfirm */}
                <Propconfirm isOpenProp={propconfirm}>
                    <div className="flex flex-col gap-7">
                        <p>Are you Sure to delete this task!</p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleDeleteSaleOrder}
                                className="bg-blue-600 px-9 py-2
                            text-white rounded-lg">Yes</button>
                            <button
                                onClick={() => setPropconfirm(false)}
                                className="bg-red-600 px-9 py-2 text-white rounded-lg">No</button>
                        </div>
                    </div>
                </Propconfirm>


                {/* Modal */}
                <ModalSaleOrder
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    initialData={selectedData}
                    mode={isEditMode ? 'update' : 'create'}
                />
            </div>
        </>
    )
}
