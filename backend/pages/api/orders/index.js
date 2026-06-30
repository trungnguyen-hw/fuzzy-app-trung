const { orders, products } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, count: orders.length, orders });
  } else if (req.method === 'POST') {
    const { items, total, customer, address, paymentMethod } = req.body;

    // 1. Verify stock levels first
    for (const item of (items || [])) {
      const prod = products.find(p => p.id === item.id || String(p.id) === String(item.id));
      if (!prod) {
        return res.status(404).json({ success: false, message: `Không tìm thấy sản phẩm "${item.name}" trong hệ thống` });
      }
      if (prod.stock < item.qty) {
        return res.status(400).json({ 
          success: false, 
          message: `Sản phẩm "${item.name}" không đủ tồn kho. Hiện chỉ còn ${prod.stock} sản phẩm.` 
        });
      }
    }

    // 2. Subtract from stock
    for (const item of (items || [])) {
      const prod = products.find(p => p.id === item.id || String(p.id) === String(item.id));
      prod.stock -= item.qty;
      if (prod.stock === 0) {
        prod.status = "Hết hàng";
      }
    }

    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customer: customer || "Khách hàng",
      address: address || "Hà Nội, Việt Nam",
      paymentMethod: paymentMethod || "COD",
      total: parseFloat(total) || 0,
      status: "Chờ xác nhận",
      date: new Date().toISOString().split('T')[0],
      items: items || []
    };
    orders.unshift(newOrder);
    return res.status(201).json({ success: true, message: "Đặt hàng thành công", order: newOrder });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
