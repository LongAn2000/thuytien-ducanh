# Thiệp cưới Đức Anh & Thủy Tiên

Bản dựng lại giao diện và toàn bộ hiệu ứng của thiệp mẫu https://quocanhdiepkhanh.gloweb.site/ :
máy in ảnh ở trang bìa, cuộn phim vuốt ngang, trò ghép hình mở khóa phần thông tin, lịch đếm ngược,
chương trình tiệc thả tim, dresscode lật hình, RSVP và lời cảm ơn.

HTML + CSS + JavaScript thuần, Vite để chạy local và build.

## Chạy

Cần Node ≥ 22.12 (máy này: `nvm use 22`).

```bash
npm ci
npm run dev        # http://127.0.0.1:5173
npm run test:ui    # kiểm tra bằng Playwright
```

Trên Windows: nhấp đúp `start.cmd`.

## Chỉnh nội dung

- `src/config.js`: tên, ngày giờ, gia đình, các buổi tiệc (`venues`), chương trình, chữ trong RSVP, nhạc nền, `sheetEndpoint` để nhận RSVP qua Google Apps Script (code và cách cài ở `scripts/rsvp-apps-script.gs`).
- `src/style.css`: giao diện (giữ nguyên thông số của mẫu).
- `src/main.js`: dựng các phần và xử lý hiệu ứng, tương tác.
- `public/photos/`: ảnh cưới. Đổi ảnh: sửa bảng `PHOTOS` (và `PUZZLE` cho trò ghép hình) trong `scripts/prepare-photos.py`, rồi chạy
  `python3 scripts/prepare-photos.py "/thư/mục/ảnh"` (mặc định `~/Pictures/thuytien-ducanh`). Ảnh nào chưa có trong thư mục thì được bỏ qua.
- `public/art/`: hình vẽ trang trí, nền sọc và font lấy từ thiệp mẫu.

Đây là thiệp bên **nhà trai** (lễ thành hôn 10:00 ngày 06.12.2026, Trung tâm văn hóa xã Thanh Trì). Lời cảm ơn dùng tranh chibi riêng của hai bạn
(`public/art/draw/chibi.webp`); phần Dresscode dùng ảnh thật.

## Deploy

Push lên nhánh `main` thì GitHub Actions (`.github/workflows/deploy.yml`) tự build và đăng lên GitHub Pages
tại tên miền riêng **https://ducanhthuytien.online/** (khai báo trong `public/CNAME` và Settings → Pages;
DNS ở PA Việt Nam: 4 bản ghi A `@` → 185.199.108–111.153, CNAME `www` → longan2000.github.io).
Link khách mời khung 17:30 tiệc nhà gái: https://ducanhthuytien.online/?time=1730
