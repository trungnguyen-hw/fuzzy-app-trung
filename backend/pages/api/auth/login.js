const { users } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;
    const identifier = (email || username || '').toLowerCase().trim();

    // 1. Check user login
    if (identifier === 'trungngo1903206' && password === 'trunglove123') {
      let user = users.find(u => u.username === 'trungngo1903206' || u.email === 'trungngo1903206');
      if (!user) {
        user = {
          id: 99,
          name: "Trung Nguyen User",
          email: "trungngo1903206",
          username: "trungngo1903206",
          role: "user",
          status: "Active",
          phone: "0901234567",
          avatar: "/assets/images/icons/profile.png"
        };
        users.push(user);
      }
      const token = "mock_jwt_token_" + Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role })).toString('base64');
      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        token,
        user: { id: user.id, name: user.name, email: user.email, username: user.username, role: user.role, avatar: user.avatar }
      });
    }

    // 2. Check admin login
    let adminUser = users.find(u => 
      ((u.email && u.email.toLowerCase() === identifier) || 
       (u.username && u.username.toLowerCase() === identifier)) &&
      u.password === password &&
      u.role === 'admin'
    );

    // Fallback system admin check
    if (!adminUser && (identifier === 'trungngo1903' && password === 'trunglove123')) {
      adminUser = { id: 1, name: "System Admin", email: "trungngo1903", username: "trungngo1903", role: "admin", avatar: "/assets/images/icons/profile.png" };
    }

    if (adminUser) {
      if (adminUser.status === 'Locked') {
        return res.status(403).json({ success: false, message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin!" });
      }
      const token = "mock_jwt_token_" + Buffer.from(JSON.stringify({ id: adminUser.id, email: adminUser.email || adminUser.username, role: adminUser.role })).toString('base64');
      return res.status(200).json({
        success: true,
        message: "Đăng nhập Admin thành công",
        token,
        user: { id: adminUser.id, name: adminUser.name, email: adminUser.email || adminUser.username, username: adminUser.username || adminUser.email, role: adminUser.role, avatar: adminUser.avatar }
      });
    }

    // 3. Fallback failure
    return res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu, vui lòng thử lại" });
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
