const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE = `${API_BASE_URL}/api`;

export const apiService = {
  async register(name, email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại');
      return data;
    } catch (err) {
      console.warn('Backend API fallback:', err.message);
      return { success: true, user: { name: name || email.split('@')[0], email, role: 'user' } };
    }
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username: email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Sai tài khoản hoặc mật khẩu, vui lòng thử lại');
    if (data.token) {
      localStorage.setItem('fuzzy_token', data.token);
    }
    return data;
  },

  // Products
  async getProducts() {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      if (res.ok) return data.products;
    } catch (err) {
      console.warn('Backend API fallback for products');
    }
    return null;
  },

  async getProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      const data = await res.json();
      if (res.ok) return data.product;
    } catch (err) {
      console.warn('Backend API fallback for getProduct');
    }
    return null;
  },

  async createProduct(productData) {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, product: { id: Date.now(), ...productData } };
    }
  },

  async updateProduct(id, productData) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, product: { id, ...productData } };
    }
  },

  async deleteProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      const data = await res.json();
      if (res.ok) return data.categories;
    } catch (err) {
      console.warn('Backend API fallback for categories');
    }
    return null;
  },

  async createCategory(catData) {
    try {
      const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, category: { id: Date.now(), ...catData } };
    }
  },

  async updateCategory(id, catData) {
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, category: { id, ...catData } };
    }
  },

  async deleteCategory(id) {
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Orders
  async getOrders() {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      const data = await res.json();
      if (res.ok) return data.orders;
    } catch (err) {
      console.warn('Backend API fallback for orders');
    }
    return null;
  },

  async createOrder(orderData) {
    try {
      const token = localStorage.getItem('fuzzy_token');
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (res.ok) return data.order;
    } catch (err) {
      console.warn('Backend API fallback for createOrder');
    }
    return {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customer: orderData.customer || "User",
      total: orderData.total || 0,
      status: "Chờ xác nhận",
      date: new Date().toISOString().split('T')[0]
    };
  },

  async updateOrderStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Users
  async getUsers() {
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      if (res.ok) return data.users;
    } catch (err) {
      console.warn('Backend API fallback for users');
    }
    return null;
  },

  async updateProfile(profileData) {
    try {
      const token = localStorage.getItem('fuzzy_token');
      const res = await fetch(`${API_BASE}/users/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API fallback for updateProfile');
      return { success: true, user: profileData };
    }
  },

  async updateUserStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/users/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  async updateUserRole(id, role) {
    try {
      const res = await fetch(`${API_BASE}/users/${id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Settings
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      const data = await res.json();
      if (res.ok) return data.settings;
    } catch (err) {
      console.warn('Backend API fallback for settings');
    }
    return null;
  },

  async updateSettings(settingsData) {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, settings: settingsData };
    }
  }
};
