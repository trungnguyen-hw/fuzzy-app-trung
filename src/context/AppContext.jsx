import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

const initialCart = [
  {
    id: 1,
    name: "Lounge Chair",
    price: 130.00,
    originalPrice: 160.00,
    image: "/assets/images/product/11.png",
    qty: 1,
    size: "M",
    color: "Blue"
  },
  {
    id: 2,
    name: "Hanging Light",
    price: 30.00,
    originalPrice: 60.00,
    image: "/assets/images/product/13.png",
    qty: 1,
    size: "L",
    color: "Black"
  },
  {
    id: 3,
    name: "Side Table",
    price: 50.00,
    originalPrice: 80.00,
    image: "/assets/images/product/7.png",
    qty: 1,
    size: "Standard",
    color: "Brown"
  }
];

const initialWishlist = [
  {
    id: 4,
    name: "Shiny wooden Chair",
    price: 130.00,
    originalPrice: 160.00,
    image: "/assets/images/product/18.png",
    rating: 4.5
  },
  {
    id: 5,
    name: "Bedroom Lamp",
    price: 30.00,
    originalPrice: 60.00,
    image: "/assets/images/product/19.png",
    rating: 4.8
  }
];

export const AppProvider = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fuzzy_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return initialCart;
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('fuzzy_wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return initialWishlist;
  });

  // Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fuzzy_user');
    return saved ? JSON.parse(saved) : { name: "Agasya", email: "agasya@fuzzy.com", isLoggedIn: true };
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('fuzzy_orders');
    return saved ? JSON.parse(saved) : [
      { id: "ORD-9842", date: "2026-06-28", total: 230.00, status: "Đang giao", itemsCount: 3 },
      { id: "ORD-7612", date: "2026-06-15", total: 150.00, status: "Hoàn thành", itemsCount: 1 }
    ];
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('fuzzy_addresses');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Agasya Watkin", phone: "0912345678", details: "790 Hyde Park Rd, Ontario", type: "Home", isDefault: true },
      { id: 2, name: "Agasya Office", phone: "0987654321", details: "123 Business Bay, Toronto", type: "Office", isDefault: false }
    ];
  });

  const [selectedAddress, setSelectedAddress] = useState("Home: 790 Hyde Park Rd, Ontario");
  const [selectedPayment, setSelectedPayment] = useState("Mastercard");

  useEffect(() => {
    localStorage.setItem('fuzzy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fuzzy_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fuzzy_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fuzzy_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fuzzy_addresses', JSON.stringify(addresses));
    const defaultAddr = addresses.find(a => a.isDefault);
    if (defaultAddr) {
      setSelectedAddress(`${defaultAddr.type}: ${defaultAddr.details}`);
    } else if (addresses.length > 0) {
      setSelectedAddress(`${addresses[0].type}: ${addresses[0].details}`);
    } else {
      setSelectedAddress("Chưa có địa chỉ giao hàng");
    }
  }, [addresses]);

  // Address Actions
  const addAddress = (addr) => {
    setAddresses(prev => {
      const isDefault = prev.length === 0 ? true : addr.isDefault;
      const newAddr = { id: Date.now(), ...addr, isDefault };
      if (isDefault) {
        return prev.map(a => ({ ...a, isDefault: false })).concat(newAddr);
      }
      return [...prev, newAddr];
    });
  };

  const updateAddress = (id, updated) => {
    setAddresses(prev => {
      let next = prev.map(a => a.id === id ? { ...a, ...updated } : a);
      if (updated.isDefault) {
        next = next.map(a => a.id === id ? a : { ...a, isDefault: false });
      }
      return next;
    });
  };

  const deleteAddress = (id) => {
    setAddresses(prev => {
      const filtered = prev.filter(a => a.id !== id);
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  // Cart actions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  // Auth actions
  const registerUser = async (name, email, password) => {
    const res = await apiService.register(name, email, password);
    return res;
  };

  const login = async (email, password) => {
    const res = await apiService.login(email, password);
    const userRole = res.user?.role || ((email === 'trungngo1903' || email === 'trungngo1903@gmail.com') ? 'admin' : 'user');
    const userData = { 
      id: res.user?.id || 1,
      name: res.user?.name || email, 
      email: res.user?.email || email, 
      username: res.user?.username || email,
      role: userRole, 
      isLoggedIn: true 
    };
    setUser(userData);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('fuzzy_token');
    localStorage.removeItem('fuzzy_app_unlocked');
    setUser({ name: "", email: "", isLoggedIn: false });
  };

  const updateUserProfile = async (profileData) => {
    const res = await apiService.updateProfile(profileData);
    if (res.success) {
      setUser(prev => ({
        ...prev,
        ...res.user
      }));
    }
    return res;
  };

  const createOrder = async () => {
    const orderData = {
      customer: user.name || "User",
      address: selectedAddress,
      paymentMethod: selectedPayment,
      total: grandTotal,
      items: cart
    };
    const created = await apiService.createOrder(orderData);
    setOrders(prev => [created, ...prev]);
    clearCart();
    return created;
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shippingFee = cart.length > 0 ? 20.00 : 0;
  const grandTotal = subtotal + shippingFee;

  return (
    <AppContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      wishlist,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      user,
      registerUser,
      login,
      logout,
      updateUserProfile,
      orders,
      createOrder,
      addresses,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      selectedAddress,
      setSelectedAddress,
      selectedPayment,
      setSelectedPayment,
      subtotal,
      shippingFee,
      grandTotal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
