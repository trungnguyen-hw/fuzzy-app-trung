const { users } = require('../../../lib/db');

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, count: users.length, users });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
