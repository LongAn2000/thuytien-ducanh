"""Cắt và nén ảnh cưới vào public/photos theo đúng khung của từng phần thiệp.

Chạy:  python3 scripts/prepare-photos.py "/đường/dẫn/thư/mục/ảnh"

Sửa bảng PHOTOS bên dưới để đổi ảnh: (tên file nguồn, tên file đích, rộng, cao, tâm ngang 0..1, tâm dọc 0..1).
Tâm ngang/dọc là điểm muốn giữ ở giữa khung khi phải cắt bớt ảnh. Có thể thêm số thứ 7 là độ zoom (mặc định 1).
Ảnh nguồn nào chưa có trong thư mục thì bỏ qua (giữ nguyên ảnh cũ trong public/photos).
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

PHOTOS = [
    # Trang bìa: tấm ảnh in ra từ máy in
    ('DSC09555.JPG', 'hero.webp', 708, 1008, 0.50, 0.60),
    # Album cuộn phim (khung ngang): xen kẽ áo dài với đồ trắng
    ('PVT03879.JPG', 'gallery-01.webp', 760, 541, 0.50, 0.50),
    ('PVT04128.JPG', 'gallery-02.webp', 760, 541, 0.50, 0.30),
    ('PVT03944.JPG', 'gallery-03.webp', 760, 541, 0.55, 0.50),
    ('PVT04149.JPG', 'gallery-04.webp', 760, 541, 0.50, 0.50),
    ('PVT04069.JPG', 'gallery-05.webp', 760, 541, 0.50, 0.45),
    ('PVT04180.JPG', 'gallery-06.webp', 760, 541, 0.50, 0.55),
    ('PVT04100.JPG', 'gallery-07.webp', 760, 541, 0.50, 0.35),
    ('PVT04195.JPG', 'gallery-08.webp', 760, 541, 0.50, 0.50),
    ('PVT04102.JPG', 'gallery-09.webp', 760, 541, 0.50, 0.50),
    ('PVT04232.JPG', 'gallery-10.webp', 760, 541, 0.50, 0.30),
    # Lịch
    ('DSC09501.JPG', 'cal-photo-1.webp', 560, 700, 0.50, 0.45),
    ('DSC09571.JPG', 'cal-photo-2.webp', 440, 550, 0.50, 0.45),
    # Chương trình (Agenda): đón khách, làm lễ, dùng tiệc, game & quẩy
    ('don-khach.jpg', 'agenda-04.webp', 560, 747, 0.50, 0.55),
    ('lam-le.jpg', 'agenda-05.webp', 560, 747, 0.50, 0.50),
    ('dung-tiec.JPG', 'agenda-06.webp', 560, 747, 0.52, 0.50),
    ('game-quay.JPG', 'agenda-07.webp', 560, 747, 0.50, 0.50),
    # Dresscode: hai khung hình lật qua lại (cùng bối cảnh, hai dáng)
    ('DSC09443.jpg', 'pose-a.webp', 760, 596, 0.50, 0.48),
    ('DSC09471.JPG', 'pose-b.webp', 760, 596, 0.50, 0.48),
]

# Lời cảm ơn: ảnh tròn kiểu sticker. Hiện phần cảm ơn dùng tranh chibi (public/art/draw/), nên để trống.
# (nguồn, đích, tâm ngang, tâm dọc[, cỡ khung so với cạnh ngắn của ảnh, mặc định 0.55])
STICKERS = []


# Trò ghép hình: một tấm ảnh chụp hai người, cắt đôi ở chỗ giữa hai người.
# (nguồn, vị trí đường cắt 0..1, mép trái, mép phải, mép trên, mép dưới — đều tính theo tỉ lệ ảnh)
# Mảnh trái cố định, mảnh phải kéo vào. Tai ghép của mảnh trái lấn sang phải 0.18 bề ngang mảnh phải.
# Hai mảnh có thể rộng khác nhau để đường cắt nằm đúng chỗ mình muốn mà không phải cắt bớt người bên trái.
# Chạy xong, chép hai số ratio và left in ra vào puzzle trong src/config.js.
PUZZLE = ('anh-1.JPG', 0.515, 0.0, 0.995, 0.21, 0.94)
PUZZLE_W = 400  # bề ngang mảnh phải (px)


def puzzle_pieces(img, cut, left, right, top, bottom):
    x_cut, x0, x1 = cut * img.width, left * img.width, right * img.width
    y0, y1 = top * img.height, bottom * img.height
    w = x1 - x_cut  # mảnh phải
    wl = x_cut + 0.18 * w - x0  # mảnh trái, gồm cả tai ghép
    ratio, lw = (y1 - y0) / w, wl / w
    h = round(PUZZLE_W * ratio)
    a = img.crop((round(x0), round(y0), round(x0 + wl), round(y1))).resize((round(PUZZLE_W * lw), h), Image.LANCZOS)
    b = img.crop((round(x_cut), round(y0), round(x1), round(y1))).resize((PUZZLE_W, h), Image.LANCZOS)
    print(f'puzzle: ratio: {ratio:.3f}, left: {lw:.3f}')
    return a, b


def cover(img, w, h, fx, fy, zoom=1):
    scale = max(w / img.width, h / img.height) * zoom
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = min(max(round(img.width * fx - w / 2), 0), img.width - w)
    top = min(max(round(img.height * fy - h / 2), 0), img.height - h)
    return img.crop((left, top, left + w, top + h))


def sticker(img, fx, fy, frac=0.55, size=360, border=14):
    side = round(min(img.width, img.height) * frac)
    cx, cy = img.width * fx, img.height * fy
    left = min(max(round(cx - side / 2), 0), img.width - side)
    top = min(max(round(cy - side / 2), 0), img.height - side)
    face = img.crop((left, top, left + side, top + side)).resize((size - 2 * border,) * 2, Image.LANCZOS)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(out).ellipse((0, 0, size - 1, size - 1), fill=(255, 251, 239, 255))
    mask = Image.new('L', face.size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0, face.width - 1, face.height - 1), fill=255)
    out.paste(face, (border, border), mask)
    return out


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else '/home/logan/Pictures/thuytien-ducanh')
    dst = Path(__file__).resolve().parent.parent / 'public' / 'photos'
    dst.mkdir(parents=True, exist_ok=True)
    for name, out, w, h, fx, fy, *zoom in PHOTOS:
        if not (src / name).exists():
            print('bỏ qua (chưa có ảnh)', name, '->', out)
            continue
        img = Image.open(src / name)
        img.draft('RGB', (2 * max(w, h) * (zoom[0] if zoom else 1),) * 2)
        img = ImageOps.exif_transpose(img).convert('RGB')
        cover(img, w, h, fx, fy, *zoom).save(dst / out, 'WEBP', quality=82, method=6)
        print('ok', out)
    name, *box = PUZZLE
    img = ImageOps.exif_transpose(Image.open(src / name)).convert('RGB')
    for piece, out in zip(puzzle_pieces(img, *box), ('puzzle-left.webp', 'puzzle-right.webp')):
        piece.save(dst / out, 'WEBP', quality=82, method=6)
        print('ok', out)
    for name, out, fx, fy, *frac in STICKERS:
        if not (src / name).exists():
            print('bỏ qua (chưa có ảnh)', name, '->', out)
            continue
        img = ImageOps.exif_transpose(Image.open(src / name)).convert('RGB')
        sticker(img, fx, fy, *frac).save(dst / out, 'WEBP', quality=85, method=6)
        print('ok', out)


if __name__ == '__main__':
    main()
