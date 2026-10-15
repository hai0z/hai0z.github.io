# Apple Design System Portfolio — Nguyễn Ngọc Hải (@hai0z)

Trang web portfolio cá nhân của **Nguyễn Ngọc Hải (@hai0z)** được thiết kế và xây dựng theo chuẩn xác định hệ thống nhận diện số **Apple Design System** (từ bảng thiết kế token chính thức của Apple).

---

##  Đặc trưng cốt lõi theo chuẩn Apple Design System

| Tiêu chuẩn | Thực thi trong mã nguồn |
|---|---|
| **Bảng màu chủ đạo** | `Primary: #0071E3` (Apple Cobalt Blue), `Accent: #2997FF`, `Canvas: #FFFFFF`, `Surface: #F5F5F7`, `Body: #1D1D1F`, `Muted: #6E6E73` |
| **Giao diện tối (Dark Theme)** | Hỗ trợ tự động theo OS và chuyển đổi thủ công: `Canvas: #090F16`, `Surface: #181D24`, `Raised: #242930`, `Accent: #007BF7` |
| **Triết lý Chiều sâu (Elevation)** | **Color-blocking hoàn toàn** — Không sử dụng drop shadows. Phân tầng thị giác bằng sự chuyển đổi bề mặt màu tinh tế |
| **Hình khối (Corner Radii)** | Nút bấm chính hình viên thuốc (`rounded.full: 9999px`), Thẻ nội dung Bento cạnh sắc (`0px` border-radius) |
| **Typography** | Phân cấp chặt chẽ: `SF Pro Display` (56px, 40px, 28px, 21px) và `SF Pro Text` (19px, 17px, 12px) |
| **Thanh điều hướng** | Chiều cao chuẩn Apple `44px`, lớp nền mờ hiệu ứng kính thủy tinh `backdrop-filter: saturate(180%) blur(20px)` |
| **Khả năng tiếp cận (A11y)** | `:focus-visible` viền 2px màu xanh thương hiệu (`#0071E3`), độ tương phản chuẩn WCAG AAA |

---

## 🚀 Các dự án thực tế nổi bật của @hai0z

1. **Harmonify (Music Streaming App)**: Ứng dụng phát nhạc phong cách Spotify viết bằng React Native, TypeScript, TrackPlayer, Zustand, NativeWind, đồng bộ lời bài hát thời gian thực và ZingMP3 API.
2. **hzphim**: Web xem phim trực tuyến xây dựng với Next.js, React Player, Zustand, triển khai trên Vercel tại [hzphim.vercel.app](https://hzphim.vercel.app).
3. **e-Learning Platform**: Nền tảng học trực tuyến hiện đại với TypeScript, Next.js / React triển khai tại [e-learning-one-rho.vercel.app](https://e-learning-one-rho.vercel.app).
4. **Electron Cinema Desktop**: Ứng dụng xem phim desktop đa nền tảng (macOS, Windows, Linux) viết bằng Electron, React, Vite, Tailwind CSS.

---

## 💻 Cách chạy trên máy cục bộ (Local Development)

### Cách 1: Chạy trực tiếp
Mở trực tiếp tệp `index.html` trong trình duyệt bất kỳ.

### Cách 2: Chạy qua Node.js Server
```bash
npm start
# hoặc
node server.js
```
Truy cập: `http://localhost:3000`

---

## 🌐 Triển khai lên GitHub Pages (cho `hai0z.github.io`)

1. Đẩy mã nguồn lên repository `hai0z.github.io` trên GitHub của bạn:
   ```bash
   git add .
   git commit -m "feat: Apple Design System portfolio for @hai0z"
   git branch -M main
   git remote add origin https://github.com/hai0z/hai0z.github.io.git
   git push -u origin main
   ```
2. Vào **Settings** trên GitHub -> mục **Pages** -> chọn nhánh `main` và thư mục `/ (root)` -> nhấn **Save**.
3. Trang web sẽ hoạt động trực tiếp tại địa chỉ: `https://hai0z.github.io`
