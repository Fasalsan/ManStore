import {
  FaTachometerAlt,
  FaTshirt,
  FaPalette,
  FaRuler,
  FaBox,
  FaUserTie,
  FaUsers,
  FaShoppingCart,
  FaFlask,
} from "react-icons/fa";

export const sidebar = [
  {
    id: 1,
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: <FaTshirt />,
    label: "Brand",
    path: "/brand",
  },
  {
    id: 3,
    icon: <FaPalette />,
    label: "Color",
    path: "/color",
  },
  {
    id: 4,
    icon: <FaRuler />,
    label: "Size",
    path: "/size",
  },
  {
    id: 5,
    icon: <FaBox />,
    label: "Products",
    path: "/product",
  },
  {
    id: 6,
    icon: <FaUserTie />,
    label: "Employee",
    path: "/employee",
  },
  {
    id: 7,
    icon: <FaUsers />,
    label: "Customer",
    path: "/customer",
  },
  {
    id: 8,
    icon: <FaShoppingCart />,
    label: "Sales Order",
    path: "/salesorder",
  }
];

