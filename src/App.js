import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import SalesOrder from './pages/SalesOrder';
import ProtectedRoute from './auth/ProtectedRoute';
import Layout from './components/Layout';
import Product from './pages/Products';
import Customer from './pages/Customer';
import Order from './pages/Order';
import NoPage from './pages/NoPage';
import Register from './auth/Register';
import Color from './pages/Color';
import Employee from './pages/Employee';
import CreateSalesOrder from './pages/CreateSalesOrder';
import Size from './pages/Size';
import Brand from './pages/Brand'
import Dashboard from './pages/Dashboard';
import TestingCate from './pages/TestingCate';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="brand" element={<Brand />} />
            <Route path="color" element={<Color />} />
            <Route path="size" element={<Size />} />
            <Route path="product" element={<Product />} />
            <Route path="customer" element={<Customer />} />
            <Route path="employee" element={<Employee />} />
            <Route path="order" element={<Order />} />
            <Route path="salesorder" element={<SalesOrder />} />
            <Route path="createSalesOrder" element={<CreateSalesOrder />} />
            <Route path="testing" element={<TestingCate />} />
          </Route>
         
          {/* 404 */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
