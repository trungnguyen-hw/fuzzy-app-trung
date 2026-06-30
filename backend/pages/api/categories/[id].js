const { categories } = require('../../../lib/db');

export default function handler(req, res) {
  const { id } = req.query;
  const catId = Number(id);
  const index = categories.findIndex(c => c.id === catId || String(c.id) === String(id));

  if (req.method === 'PUT') {
    if (index === -1) return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    categories[index] = { ...categories[index], ...req.body };
    return res.status(200).json({ success: true, message: "Cập nhật danh mục thành công", category: categories[index] });
  } else if (req.method === 'DELETE') {
    if (index === -1) return res.status(404).json({ success: false, message: "Không tìm thấy danh mục để xóa" });
    categories.splice(index, 1);
    return res.status(200).json({ success: true, message: "Xóa danh mục thành công" });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
