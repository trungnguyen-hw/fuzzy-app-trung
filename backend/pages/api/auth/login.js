const { users } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;
    const identifier = (email || username || '').toLowerCase().trim();

    // 1. Check user login: trungngo1903206 / trunglove123
    if (identifier === 'trungngo1903206' && password === 'trunglove123') {
      const user = users.find(u => u.username === 'trungngo1903206') || {
        id: 2,
        name: "Trung Nguyen",
        email: "trungngo1903206",
        username: "trungngo1903206",
        role: "user",
        status: "Active",
        phone: "0912345678",
        avatar: "/assets/images/icons/profile1.png"
      };
      const token = "mock_jwt_token_" + Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role })).toString('base64');
      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        token,
        user: { id: user.id, name: user.name, email: user.email, username: user.username, role: user.role, avatar: user.avatar }
      });
    }

    // 2. Check admin login: admin / admin123
    if (identifier === 'admin' && password === 'admin123') {
      const adminUser = users.find(u => u.username === 'admin') || {
        id: 1,
        name: "System Admin",
        email: "admin",
        username: "admin",
        role: "admin",
        status: "Active",
        phone: "0901234567",
        avatar: "/assets/images/icons/profile.png"
      };
      const token = "mock_jwt_token_" + Buffer.from(JSON.stringify({ id: adminUser.id, email: adminUser.email, role: adminUser.role })).toString('base64');
      return res.status(200).json({
        success: true,
        message: "Đăng nhập Admin thành công",
        token,
        user: { id: adminUser.id, name: adminUser.name, email: adminUser.email, username: adminUser.username, role: adminUser.role, avatar: adminUser.avatar }
      });
    }

    // 3. Fallback failure for any other accounts/passwords
    return res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu, vui lòng thử lại" });
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
