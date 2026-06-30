import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Client Pages
import Landing from './pages/Landing';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Wishlist from './pages/Wishlist';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import SavedAddresses from './pages/SavedAddresses';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Client Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Client Routes */}
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/saved-addresses" element={<ProtectedRoute><SavedAddresses /></ProtectedRoute>} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
