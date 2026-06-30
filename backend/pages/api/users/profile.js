const { users } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Unauthorized - Thiếu Token" });
  }

  const token = authHeader.split(' ')[1];
  let userId = null;

  try {
    if (token === 'mock_jwt_token_admin') {
      userId = 1;
    } else if (token === 'mock_jwt_token_user') {
      userId = 2;
    } else if (token.startsWith('mock_jwt_token_')) {
      const base64Str = token.replace('mock_jwt_token_', '');
      const decodedStr = Buffer.from(base64Str, 'base64').toString('ascii');
      const payload = JSON.parse(decodedStr);
      userId = payload.id;
    }
  } catch (e) {
    console.error("Lỗi giải mã token:", e.message);
  }

  // Fallback nếu không xác định được ID (lấy user mặc định Agasya)
  if (!userId) {
    userId = 2; 
  }

  const user = users.find(u => String(u.id) === String(userId));
  if (!user) {
    return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
  }

  const { name, email, phone, dob, avatar } = req.body;
  
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (dob) user.dob = dob;
  if (avatar) user.avatar = avatar;

  return res.status(200).json({ 
    success: true, 
    message: "Cập nhật thông tin cá nhân thành công", 
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username || user.email,
      role: user.role,
      phone: user.phone,
      dob: user.dob,
      avatar: user.avatar
    }
  });
}
