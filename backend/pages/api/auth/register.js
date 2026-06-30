const { users } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email và Mật khẩu là bắt buộc" });
    }
    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ success: false, message: "Email này đã được đăng ký" });
    }
    const newUser = { id: Date.now(), name: name || email.split('@')[0], email, password };
    users.push(newUser);
    return res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
