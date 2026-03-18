# 🏠 Airbnb 2024 - Full Stack Application

> Một ứng dụng web đầy đủ clone của Airbnb với tính năng quản lý đặt phòng, tìm kiếm, và quản trị viên.

![TypeScript](https://img.shields.io/badge/TypeScript-70.9%25-blue)
![SCSS](https://img.shields.io/badge/SCSS-17.8%25-pink)
![JavaScript](https://img.shields.io/badge/JavaScript-10.7%25-yellow)
![License](https://img.shields.io/badge/License-ISC-green)

---

## ⚙️ Tech Stack

**Backend**
- Node.js
- Express 4.21.1
- JavaScript (ESM)
- MySQL 3.11.4
- Sequelize 6.37.5 (ORM)
- JWT (Authentication)
- BCryptJS (Password Hashing)
- Multer (File Upload)
- CORS
- Dotenv

**Frontend**
- React
- TypeScript
- Vite
- Redux Toolkit
- SCSS

**Database**
- MySQL (Relational Database)
- Sequelize ORM (Model, Migration, Query)

---
## 📁 Cấu trúc dự án

```
project_airbnb_2024/
│
├── .vscode/
│
├── airbnb_backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/        # Cấu hình hệ thống (DB, env,...)
│   │   ├── controller/    # Xử lý logic nghiệp vụ
│   │   ├── models/        # Sequelize models (DB)
│   │   ├── routes/        # Định nghĩa API routes
│   ├── app.js             # Entry point backend
│   ├── package.json
│   └── package-lock.json
│
├── airbnb_fontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/    # UI components
│   │   ├── Pages/         # Các trang
│   │   ├── Template/      # Layout / template
│   │   ├── assets/        # Hình ảnh, static files
│   │   ├── constant/      # Hằng số
│   │   ├── hooks/         # Custom hooks
│   │   ├── redux/         # State management
│   │   ├── services/      # API calls
│   │   ├── utils/         # Helper functions
│   │   ├── App.tsx
│   │   └── global.d.ts
│
└── README.md
```

---

## 🚀 Cài đặt

### Yêu cầu
- Node.js >= 14
- npm hoặc yarn
- MySQL >= 5.7

---

### 1. Clone project

```bash
git clone https://github.com/conghieu26/project_airbnb_2024.git
cd project_airbnb_2024
```

---

### 2. Database setup

```sql
CREATE DATABASE airbnb_db;
```

---

### 3. Backend setup

```bash
cd airbnb_backend
npm install
cp .env.example .env
```

#### Cấu hình `.env`

```env
NODE_ENV=development
PORT=8000

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=airbnb_db
DATABASE_USER=root
DATABASE_PASSWORD=your_password

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

---

### 4. Sync Database (Sequelize)

```bash
npm run dev
```

---

### 5. Frontend setup

```bash
cd airbnb_fontend
npm install
cp .env.example .env
```

#### Cấu hình `.env`

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Airbnb 2024
```

---

## ▶️ Run project

### Backend

```bash
cd airbnb_backend
npm run dev
```

Backend: http://localhost:8000

---

### Frontend

```bash
cd airbnb_fontend
npm run dev
```

Frontend: http://localhost:5173

---

## 🧱 Database Schema (Tổng quan)

### 📌 Tables
```
users
properties
bookings
reviews        # optional
images         # optional
```

### 🔗 Relationships
```
User      1 ─── N   Booking
Property  1 ─── N   Booking
Property  1 ─── N   Image
Property  1 ─── N   Review   # optional
User      1 ─── N   Review   # optional
```
---

## 📖 API Endpoints

## 📖 API Endpoints

### 🔐 Authentication
```
POST   /api/auth/signup        # Đăng ký
POST   /api/auth/signin        # Đăng nhập
```

---

### 👤 Users
```
GET    /api/users              # Lấy danh sách user
GET    /api/users/:id          # Lấy chi tiết user
PUT    /api/users/:id          # Cập nhật user
DELETE /api/users/:id          # Xóa user
```

---

### 🏠 Phòng (Phong)
```
GET    /api/phong              # Lấy danh sách phòng
GET    /api/phong/:id          # Lấy chi tiết phòng
POST   /api/phong              # Tạo phòng
PUT    /api/phong/:id          # Cập nhật phòng
DELETE /api/phong/:id          # Xóa phòng
```

---

### 📍 Vị trí (ViTri)
```
GET    /api/vitri              # Lấy danh sách vị trí
GET    /api/vitri/:id          # Chi tiết vị trí
POST   /api/vitri              # Tạo vị trí
PUT    /api/vitri/:id          # Cập nhật vị trí
DELETE /api/vitri/:id          # Xóa vị trí
```

---

### 📅 Đặt phòng (DatPhong)
```
GET    /api/datphong           # Danh sách đặt phòng
GET    /api/datphong/:id       # Chi tiết đặt phòng
POST   /api/datphong           # Tạo đặt phòng
PUT    /api/datphong/:id       # Cập nhật
DELETE /api/datphong/:id       # Hủy đặt phòng
```

---

### 💬 Bình luận (BinhLuan)
```
GET    /api/binhluan           # Danh sách bình luận
GET    /api/binhluan/:id       # Chi tiết bình luận
POST   /api/binhluan           # Tạo bình luận
PUT    /api/binhluan/:id       # Cập nhật
DELETE /api/binhluan/:id       # Xóa bình luận
```

---

## 🧪 Scripts

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

### Backend
```bash
npm run dev
npm start
npm test
npm run lint
```

---

## 🐛 Troubleshooting

### Database
- Kiểm tra MySQL đang chạy
- Kiểm tra `.env`
- Kiểm tra port 3306

### CORS
- Kiểm tra middleware CORS
- Kiểm tra `VITE_API_BASE_URL`

### Port conflict

```bash
lsof -ti:8000 | xargs kill -9
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## 🌐 Browser Support
- Chrome
- Firefox
- Safari
- Edge

---

## 👤 Author

Cong Hieu  
https://github.com/conghieu26
