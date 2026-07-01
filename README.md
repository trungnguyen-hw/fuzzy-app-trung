# Fuzzy Mobile E-Commerce

Dự án ứng dụng E-commerce đồ nội thất di động (Fuzzy Mobile Furniture Store) gồm 2 phần: Frontend React Vite và Backend Next.js API Routes.

## Công nghệ sử dụng
- **Frontend**: React, Vite, React Router (SPA), PWA (Service Worker, Web App Manifest)
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Mock in-memory database để phục vụ demo nhanh.

---

## Hướng dẫn chạy Local

### 1. Khởi chạy Backend
```bash
cd backend
npm install
npm run dev
```
Backend sẽ khởi chạy ở cổng http://localhost:5000.

### 2. Khởi chạy Frontend
```bash
npm install
npm run dev
```
Frontend sẽ chạy tại cổng mặc định của Vite (thường là http://localhost:5173). Theo mặc định, frontend sẽ kết nối tới backend localhost:5000.

---

## Hướng dẫn Deploy lên Vercel

Dự án được tách ra để deploy thành 2 project riêng biệt trên Vercel:

### 1. Backend Project (Next.js)
Khi import repository này lên Vercel để làm Backend, hãy cấu hình như sau:
- **Framework Preset**: `Next.js`
- **Root Directory**: `backend`
- **Build and Output Settings**: Để mặc định (Vercel tự thiết lập build cho Next.js).
- **Output Directory**: Để trống.

*Sau khi deploy xong Backend, hãy copy URL của dự án backend đã được deploy (ví dụ: `https://your-backend.vercel.app`).*

### 2. Frontend Project (Vite)
Khi import repository này lên Vercel để làm Frontend, hãy cấu hình như sau:
- **Framework Preset**: `Vite`
- **Root Directory**: `.` (thư mục gốc)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - Key: `VITE_API_URL`
  - Value: `<link backend vercel đã copy>` (ví dụ: `https://your-backend.vercel.app`, lưu ý không có dấu gạch chéo `/` ở cuối).

---

## Tài khoản Demo

### Quản trị viên (Admin):
- **Tài khoản**: `trungngo1903` hoặc `trungngo1903@gmail.com`
- **Mật khẩu**: `trunglove123`

### Khách hàng (User):
- **Tài khoản**: `agasya@fuzzy.com` | **Mật khẩu**: `123456`
- **Tài khoản**: `trung@fuzzy.com` | **Mật khẩu**: `123456`

---

## Ghi chú quan trọng
- Backend sử dụng database lưu trữ tạm thời trong bộ nhớ (**in-memory database**). Do tính chất serverless của Vercel (chế độ cold start, restart container), dữ liệu (sản phẩm, đơn hàng, tài khoản đăng ký mới) sẽ bị reset về trạng thái ban đầu khi serverless function khởi động lại.
