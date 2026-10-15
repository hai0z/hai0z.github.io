# Apple Design System Portfolio — Hai Nguyen (@hhai0z)

Trang web portfolio cá nhân của **Hai Nguyen (@hhai0z)** được thiết kế và xây dựng theo chuẩn xác định hệ thống nhận diện số **Apple Design System** (từ bảng thiết kế token chính thức của Apple).

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

## 🚀 Tính năng nổi bật

1. **Keynote Hero Presentation**: Tiêu đề Display Large 56px với nhịp chữ chuẩn `-0.28px` tracking và dải thông số 3 cột đo lường hiệu năng.
2. **Interactive Bento Grid Showcase**: Thẻ dự án góc sắc (0px) với bộ lọc thời gian thực (`Distributed Systems`, `Fullstack`, `Open Source`).
3. **Interactive Terminal (`hhai0z@cli:~$`)**: Giả lập Terminal macOS Apple tương tác trực tiếp với các lệnh: `about`, `skills`, `projects`, `stats`, `theme`, `clear`.
4. **Project Architecture Modal**: Popup đào sâu kiến trúc hệ thống, Wasm sandboxing, Raft consensus với phím tắt `Esc` và click-outside.
5. **Fast Copy-to-Clipboard & Apple Toast**: Nút sao chép địa chỉ email `hainguyen56211@gmail.com` với thông báo Toast trượt ở `z-index: 10000`.
6. **Live Theme Switcher**: Chuyển đổi Dark Mode / Light Mode mượt mà và lưu trạng thái vào `localStorage`.

---

## 💻 Cách chạy trên máy cục bộ (Local Development)

### Cách 1: Chạy trực tiếp (Không cần cài thêm thư viện)
Bạn chỉ cần mở trực tiếp tệp `index.html` trong bất kỳ trình duyệt nào (Chrome, Safari, Edge, Firefox).

### Cách 2: Chạy qua Node.js HTTP Server có sẵn
```bash
# Khởi động server nội bộ
npm start
# hoặc
node server.js
```
Truy cập: `http://localhost:3000`

---

## 🌐 Triển khai lên GitHub Pages (cho `hhai0z.github.io`)

1. Đẩy mã nguồn lên repository trên GitHub:
   ```bash
   git add .
   git commit -m "feat: Apple Design System portfolio for @hhai0z"
   git branch -M main
   git remote add origin https://github.com/hhai0z/hhai0z.github.io.git
   git push -u origin main
   ```
2. Vào tab **Settings** của repository trên GitHub -> mục **Pages** -> chọn nhánh `main` và thư mục `/ (root)` -> nhấn **Save**.
3. Trang web của bạn sẽ tự động hoạt động trực tiếp tại địa chỉ: `https://hhai0z.github.io`
