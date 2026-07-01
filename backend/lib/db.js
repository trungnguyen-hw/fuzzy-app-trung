// Backend Mock Database for Fuzzy E-Commerce Administration

let users = [
  { 
    id: 1, 
    name: "System Admin", 
    email: "admin", 
    username: "admin",
    password: "admin123", 
    role: "admin", 
    status: "Active", 
    phone: "0901234567", 
    avatar: "/assets/images/icons/profile.png", 
    createdAt: "2026-01-01" 
  },
  { 
    id: 2, 
    name: "Trung Nguyen", 
    email: "trungngo1903206", 
    username: "trungngo1903206",
    password: "trunglove123", 
    role: "user", 
    status: "Active", 
    phone: "0912345678", 
    avatar: "/assets/images/icons/profile1.png", 
    createdAt: "2026-02-15" 
  }
];

let categories = [
  { id: 1, name: "Chairs", items: 120, image: "/assets/images/product/3.png", description: "All ergonomic & wooden chairs" },
  { id: 2, name: "Tables", items: 120, image: "/assets/images/product/21.png", description: "Dining & coffee tables" },
  { id: 3, name: "Sofas", items: 120, image: "/assets/images/product/11.png", description: "Comfortable velvet sofas" },
  { id: 4, name: "Lamps", items: 80, image: "/assets/images/product/24.png", description: "Hanging & bedroom lights" },
  { id: 5, name: "Cabinets", items: 50, image: "/assets/images/product/23.png", description: "Storage cabinets & cupboards" }
];

let products = [
  { id: 1, name: "Sheesham Wood Armchair", price: 120.00, originalPrice: 150.00, rating: 4.5, image: "/assets/images/product/1.png", category: "Chairs", stock: 15, colors: ["Brown", "Black"], sizes: ["M", "L"], status: "Đang bán", description: "Handcrafted Sheesham wood armchair." },
  { id: 2, name: "Modern Velvet Sofa", price: 350.00, originalPrice: 400.00, rating: 4.8, image: "/assets/images/product/2.png", category: "Sofas", stock: 8, colors: ["Grey", "Blue"], sizes: ["L", "XL"], status: "Đang bán", description: "Luxurious velvet sofa." },
  { id: 3, name: "Wooden Dining Table", price: 280.00, originalPrice: 320.00, rating: 4.7, image: "/assets/images/product/3.png", category: "Tables", stock: 2, colors: ["Brown"], sizes: ["L"], status: "Đang bán", description: "Solid wood dining table." },
  { id: 7, name: "Side Table", price: 50.00, originalPrice: 80.00, rating: 4.3, image: "/assets/images/product/7.png", category: "Tables", stock: 20, colors: ["Brown", "Black"], sizes: ["S", "M"], status: "Đang bán", description: "Compact side table." },
  { id: 11, name: "Lounge Chair", price: 130.00, originalPrice: 160.00, rating: 4.6, image: "/assets/images/product/11.png", category: "Chairs", stock: 0, colors: ["Blue"], sizes: ["M"], status: "Hết hàng", description: "Ergonomic lounge chair." },
  { id: 13, name: "Hanging Light", price: 30.00, originalPrice: 60.00, rating: 4.9, image: "/assets/images/product/13.png", category: "Lamps", stock: 25, colors: ["Black", "Gold"], sizes: ["Standard"], status: "Đang bán", description: "Modern hanging fixture." }
];

let orders = [
  { 
    id: "ORD-9842", 
    customer: "Agasya Watkin", 
    email: "agasya@fuzzy.com",
    phone: "0912345678",
    address: "790 Hyde Park Rd, Ontario",
    total: 230.00, 
    paymentMethod: "Mastercard",
    status: "Đang giao", 
    date: "2026-06-28", 
    items: [
      { name: "Lounge Chair", qty: 1, price: 130, color: "Blue", size: "M" }, 
      { name: "Side Table", qty: 1, price: 50, color: "Brown", size: "Standard" }
    ] 
  },
  { 
    id: "ORD-7612", 
    customer: "Trung Nguyen", 
    email: "trung@fuzzy.com",
    phone: "0987654321",
    address: "123 Street Name, Hanoi",
    total: 150.00, 
    paymentMethod: "VNPay",
    status: "Chờ xác nhận", 
    date: "2026-06-29", 
    items: [
      { name: "Sheesham Wood Armchair", qty: 1, price: 120, color: "Brown", size: "M" }
    ] 
  },
  { 
    id: "ORD-3310", 
    customer: "John Doe", 
    email: "john@gmail.com",
    phone: "0933445566",
    address: "456 Ocean Ave, Da Nang",
    total: 80.00, 
    paymentMethod: "COD",
    status: "Hoàn thành", 
    date: "2026-06-27", 
    items: [
      { name: "Side Table", qty: 1, price: 50, color: "Black", size: "S" }
    ] 
  }
];

let settings = {
  shopName: "Fuzzy Mobile Furniture Store",
  contactEmail: "support@fuzzy.com",
  phone: "+84 901 234 567",
  address: "790 Hyde Park Rd, Ontario, Canada",
  currency: "USD ($)",
  themeColor: "#122636",
  enableNotifications: true
};

module.exports = { users, categories, products, orders, settings };
