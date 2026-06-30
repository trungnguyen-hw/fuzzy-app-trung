const { products } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, count: products.length, products });
  } else if (req.method === 'POST') {
    const { name, price, stock, category, image } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: "Tên và giá sản phẩm là bắt buộc" });
    }
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      originalPrice: parseFloat(price) * 1.2,
      rating: 4.5,
      image: image || "/assets/images/product/1.png",
      category: category || "General",
      stock: parseInt(stock) || 10
    };
    products.push(newProduct);
    return res.status(201).json({ success: true, message: "Tạo sản phẩm thành công", product: newProduct });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
