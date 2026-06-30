let { settings } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, settings });
  } else if (req.method === 'PUT') {
    settings = { ...settings, ...req.body };
    return res.status(200).json({ success: true, message: "Cập nhật cài đặt thành công", settings });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
