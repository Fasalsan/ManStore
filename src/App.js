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
import Testing from './pages/Testing';
import Size from './pages/Size';
import Brand from './pages/Brand'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Brand />} />
            <Route path="color" element={<Color />} />
            <Route path="size" element={<Size />} />
            <Route path="product" element={<Product />} />
            <Route path="customer" element={<Customer />} />
            <Route path="employee" element={<Employee />} />
            <Route path="order" element={<Order />} />
            <Route path="salesorder" element={<SalesOrder />} />
            <Route path="testing" element={<Testing />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
