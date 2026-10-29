# Thiệp cưới Đức Anh & Thủy Tiên

Bản dựng lại giao diện và toàn bộ hiệu ứng của thiệp mẫu https://quocanhdiepkhanh.gloweb.site/ :
máy in ảnh ở trang bìa, cuộn phim vuốt ngang, trò ghép hình mở khóa phần thông tin, lịch đếm ngược,
chương trình tiệc thả tim, dresscode lật hình, RSVP và lời cảm ơn.

HTML + CSS + JavaScript thuần, Vite để chạy local và build.

## Chạy

```bash
npm ci
npm run dev        # http://127.0.0.1:5173
npm run test:ui    # kiểm tra bằng Playwright
```

Trên Windows: nhấp đúp `start.cmd`.

## Chỉnh nội dung

- `src/config.js`: tên, ngày cưới chính, thông tin từng bên gia đình (`families`: bố mẹ, ngày, các mốc giờ, địa điểm, bản đồ), chương trình, chữ trong RSVP, nhạc nền, `sheetEndpoint` để nhận RSVP qua Google Apps Script.
- `src/style.css`: giao diện (giữ nguyên thông số của mẫu).
- `src/main.js`: dựng các phần và xử lý hiệu ứng, tương tác.
- `public/photos/`: ảnh cưới. Ảnh hiện tại là **ảnh tạm**. Đổi ảnh: sửa bảng `PHOTOS` trong `scripts/prepare-photos.py`, rồi chạy
  `python3 scripts/prepare-photos.py "/thư/mục/ảnh"`.
- `public/art/`: hình vẽ trang trí, nền sọc và font lấy từ thiệp mẫu.

### Link riêng cho khách từng bên

- `.../thuytien-ducanh/` — hiện cả nhà gái và nhà trai, ngày trên bìa và lịch là `weddingDate`.
- `.../thuytien-ducanh/?ben=gai` — chỉ hiện nhà gái, bìa và lịch dùng ngày của nhà gái.
- `.../thuytien-ducanh/?ben=trai` — chỉ hiện nhà trai.

**Ngày giờ, địa điểm, tên bố mẹ hiện là dữ liệu minh họa.** Tranh vẽ chibi cô dâu chú rể và mèo của mẫu
không được dùng; phần Dresscode và lời cảm ơn đang dùng ảnh thật thay thế.

## Deploy

Push lên nhánh `main` thì GitHub Actions (`.github/workflows/deploy.yml`) tự build và đăng lên GitHub Pages
tại `/thuytien-ducanh/`.
