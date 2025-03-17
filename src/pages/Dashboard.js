
import React, { useEffect, useState } from 'react';
import { FaBox, FaUserTie, FaUsers } from 'react-icons/fa';
import Loading from '../components/shared/Loading';


export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, employeesRes, customersRes] = await Promise.all([
          fetch('https://localhost:7017/api/Product/total-count'),
          fetch('https://localhost:7017/api/Employee/total-count'),
          fetch('https://localhost:7017/api/Customer/total-count'),
        ]);

        if (!productsRes.ok || !employeesRes.ok || !customersRes.ok) {
          throw new Error('One or more API requests failed');
        }

        const productsData = await productsRes.json();
        const employeesData = await employeesRes.json();
        const customersData = await customersRes.json();

        const mappedStats = [
          {
            label: 'Products',
            value: productsData.totalCount, // Adjust this based on your API response structure
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
          },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
