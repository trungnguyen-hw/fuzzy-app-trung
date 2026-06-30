const { products } = require('../../../lib/db');

export default function handler(req, res) {
  const { id } = req.query;
  const prodId = Number(id);
  const index = products.findIndex(p => p.id === prodId || p.id === id);

  if (req.method === 'GET') {
    const product = products[index] || products.find(p => String(p.id) === String(id));
    if (!product) return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    return res.status(200).json({ success: true, product });
  } else if (req.method === 'PUT') {
    if (index === -1) return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để cập nhật" });
    products[index] = { ...products[index], ...req.body };
    return res.status(200).json({ success: true, message: "Cập nhật sản phẩm thành công", product: products[index] });
  } else if (req.method === 'DELETE') {
    if (index === -1) return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để xóa" });
    products.splice(index, 1);
    return res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
