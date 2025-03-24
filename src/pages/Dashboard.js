
import React, { useEffect, useState } from 'react';
import { FaBox, FaUserTie, FaUsers, FaFileInvoice } from 'react-icons/fa';
import Loading from '../components/shared/Loading';
const localhost = 'https://localhost:7017/api/'

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, employeesRes, customersRes, salesOrderRes] = await Promise.all([
          fetch(`${localhost}Product/total-count`),
          fetch(`${localhost}Employee/total-count`),
          fetch(`${localhost}Customer/total-count`),
          fetch(`${localhost}SalesOrder/total-count`),
        ]);

        if (!productsRes.ok || !employeesRes.ok || !customersRes.ok || !salesOrderRes.ok) {
          throw new Error('One or more API requests failed');
        }

        const productsData = await productsRes.json();
        const employeesData = await employeesRes.json();
        const customersData = await customersRes.json();
        const salesOrderData = await salesOrderRes.json();

        const mappedStats = [

          {
            label: 'SalesOrder',
            value: salesOrderData.totalCount,
            icon: <FaFileInvoice className="text-orange-600 text-3xl" />,
          },
          {
            label: 'Products',
            value: productsData.totalCount,
            icon: <FaBox className="text-blue-600 text-3xl" />,
          },
          {
            label: 'Employees',
            value: employeesData.totalCount,
            icon: <FaUserTie className="text-green-600 text-3xl" />,
          },
          {
            label: 'Customers',
            value: customersData.totalCount,
            icon: <FaUsers className="text-purple-600 text-3xl" />,
          }
        ];

        setStats(mappedStats);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gray-100 p-4 rounded-full">{stat.icon}</div>
              <div>
                <div className="text-lg font-medium text-gray-700">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
