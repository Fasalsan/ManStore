import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import SalesOrder from './pages/SalesOrder';
import ProtectedRoute from './auth/ProtectedRoute';
import Layout from './components/Layout';
import Categories from './pages/Categories';
import Product from './pages/Products';
import Customer from './pages/Customer';
import User from './pages/User';
import Order from './pages/Order';
import NoPage from './pages/NoPage';
import Register from './auth/Register';
import Brand from './pages/Brand';

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
            <Route index element={<Categories />} />
            <Route path="product" element={<Product />} />
            <Route path="customer" element={<Customer />} />
            <Route path="user" element={<User />} />
            <Route path="order" element={<Order />} />
            <Route path="salesorder" element={<SalesOrder />} />
            <Route path="brand" element={<Brand />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
