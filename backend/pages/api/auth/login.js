const { users } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;
    const identifier = (email || username || '').toLowerCase();
    
    let user = users.find(u => 
      (u.email && u.email.toLowerCase() === identifier) || 
      (u.username && u.username.toLowerCase() === identifier)
    );
    
    if (!user || user.password !== password) {
      // Allow demo fallback check for trungngo1903 / trunglove123
      if ((identifier === 'trungngo1903' || identifier === 'trungngo1903@gmail.com') && password === 'trunglove123') {
        const adminObj = users.find(u => u.email === 'trungngo1903' || u.username === 'trungngo1903') || { id: 1, name: "System Admin", email: "trungngo1903", username: "trungngo1903", role: "admin" };
        const token = "mock_jwt_token_admin";
        return res.status(200).json({
          success: true,
          message: "Đăng nhập Admin thành công",
          token,
          user: adminObj
        });
      }
      return res.status(401).json({ success: false, message: "Tài khoản hoặc mật khẩu không chính xác" });
    }

    if (user.status === 'Locked') {
      return res.status(403).json({ success: false, message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin!" });
    }

    const token = "mock_jwt_token_" + Buffer.from(JSON.stringify({ id: user.id, email: user.email || user.username, role: user.role })).toString('base64');
    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user: { id: user.id, name: user.name, email: user.email || user.username, username: user.username || user.email, role: user.role || 'user', avatar: user.avatar }
    });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
