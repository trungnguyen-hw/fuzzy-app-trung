const { categories } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, count: categories.length, categories });
  } else if (req.method === 'POST') {
    const { name, image, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Tên danh mục là bắt buộc" });
    }
    const newCat = {
      id: Date.now(),
      name,
      items: 0,
      image: image || "/assets/images/product/3.png",
      description: description || ""
    };
    categories.push(newCat);
    return res.status(201).json({ success: true, message: "Thêm danh mục thành công", category: newCat });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
