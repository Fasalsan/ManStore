import { useState, useRef, useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaBeer } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SaleOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notify = () => {
    // toast.success("This is a success message!");
    // toast.error("This is an error message!");
    toast.info("This is an info message!");
    // toast.warning("This is a warning message!");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // <div className="relative inline-block text-left" ref={dropdownRef}>
    //   {/* Button to Toggle Dropdown */}
    //   <button
    //     onClick={() => setIsOpen(!isOpen)}
    //     className="px-4 py-2 text-5xl text-red-600 rounded-md focus:outline-none"
    //   >
    //    <HiOutlineUserCircle/>
    //   </button>

    //   {/* Dropdown Menu */}
    //   {isOpen && (
    //     <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
    //       <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
    //         Profile
    //       </a>
    //       <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
    //         Settings
    //       </a>
    //       <button
    //         onClick={() => alert("Logged out!")}
    //         className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   )}
    // </div>
    <>
      <div>
        <h1>Cheers! <FaBeer /></h1>

        <div>
          <h1>React Toastify Example</h1>
          <button onClick={notify}>Show Toast</button>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </>
  );
};

export default SaleOrder;
