
import React, { useState } from "react";

const StandardTable = ({ columns, data, actions, rowsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Get paginated data
    const paginatedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-700 text-white">
                        <tr >
                            {columns.map((col, index) => (
                                <th
                                    className="px-6 py-4 text-center"
                                    key={index}
                                >
                                    {col.label}
                                </th>
                            ))}
                            {actions && <th className="px-4 py-3 border-b">Actions</th>}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 text-center">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="text-center px-6 py-4">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-4 py-3 flex items-center justify-center  gap-2">
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                className={` ${action.type === "edit"
                                                    ? "text-green-500 text-lg"
                                                    : "text-red-600 text-lg "
                                                    }`}
                                                onClick={() => action.onClick(row)}
                                            >
                                                {action.icon}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {/* Pagination Controls */}
            <div className="flex w-full gap-4 justify-center items-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StandardTable;
