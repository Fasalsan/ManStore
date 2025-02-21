import React, { useRef } from "react";

const Propconfirm = ({ isOpenProp, onClose, children }) => {
    const modalRef = useRef();

    if (!isOpenProp) return null;

    // // Close modal when clicking outside of the modal content
    // const handleOverlayClick = (e) => {
    //     if (modalRef.current && !modalRef.current.contains(e.target)) {
    //         onClose();
    //     }
    // };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            // onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            >
                {children}
            </div>
        </div>
    );
};

export default Propconfirm;
