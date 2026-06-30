const { users } = require('../../../../lib/db');

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { status } = req.body;
    const user = users.find(u => String(u.id) === String(id));
    if (!user) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    user.status = status;
    return res.status(200).json({ success: true, message: "Cập nhật trạng thái tài khoản thành công", user });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
