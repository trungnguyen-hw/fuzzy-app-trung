const { orders } = require('../../../../lib/db');

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { status } = req.body;
    const order = orders.find(o => o.id === id);
    if (!order) return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    order.status = status;
    return res.status(200).json({ success: true, message: "Cập nhật trạng thái thành công", order });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
