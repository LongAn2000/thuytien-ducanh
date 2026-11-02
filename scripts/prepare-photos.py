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
    ('DSC09555.jpg', 'hero.webp', 708, 1008, 0.50, 0.40),
    # Album cuộn phim (khung ngang)
    ('PVT03879.jpg', 'gallery-01.webp', 760, 541, 0.50, 0.50),
    ('PVT03944.jpg', 'gallery-02.webp', 760, 541, 0.55, 0.50),
    ('PVT04069.jpg', 'gallery-03.webp', 760, 541, 0.50, 0.35),
    ('PVT04100.jpg', 'gallery-04.webp', 760, 541, 0.50, 0.35),
    ('PVT04102.jpg', 'gallery-05.webp', 760, 541, 0.50, 0.50),
    ('PVT04128.jpg', 'gallery-06.webp', 760, 541, 0.50, 0.35),
    ('PVT04149.jpg', 'gallery-07.webp', 760, 541, 0.50, 0.35),
    ('PVT04180.jpg', 'gallery-08.webp', 760, 541, 0.50, 0.66),
    ('PVT04195.jpg', 'gallery-09.webp', 760, 541, 0.50, 0.50),
    ('PVT04232.jpg', 'gallery-10.webp', 760, 541, 0.50, 0.38),
    # Lịch
    ('DSC09501.jpg', 'cal-photo-1.webp', 560, 700, 0.50, 0.35),
    ('DSC09571.jpg', 'cal-photo-2.webp', 440, 550, 0.50, 0.35),
    # Chương trình (Agenda): đón khách, làm lễ, dùng tiệc, game & quẩy
    ('don-khach.jpg', 'agenda-04.webp', 560, 747, 0.50, 0.55),
    ('lam-le.jpg', 'agenda-05.webp', 560, 747, 0.50, 0.50),
    ('dung-tiec.JPG', 'agenda-06.webp', 560, 747, 0.52, 0.50),
    ('game-quay.JPG', 'agenda-07.webp', 560, 747, 0.50, 0.50),
    # Dresscode: hai khung hình lật qua lại (cùng bối cảnh, hai dáng)
    ('DSC09443.jpg', 'pose-a.webp', 760, 596, 0.50, 0.48),
    ('DSC09471.JPG', 'pose-b.webp', 760, 596, 0.50, 0.48),
]

# Lời cảm ơn: ảnh tròn kiểu sticker (thay cho tranh vẽ cô dâu chú rể và thú cưng).
# (nguồn, đích, tâm ngang, tâm dọc[, cỡ khung so với cạnh ngắn của ảnh, mặc định 0.55])
STICKERS = [
    ('DSC09438.jpg', 'crew-her.webp', 0.70, 0.31, 0.36),
    ('DSC08460.jpg', 'crew-him.webp', 0.42, 0.45, 0.22),
    ('PVT04232.jpg', 'crew-pet-1.webp', 0.33, 0.38, 0.36),
    ('PVT04227.jpg', 'crew-pet-2.webp', 0.68, 0.36),
    ('DSC09857.jpg', 'crew-pet-3.webp', 0.50, 0.26),
]


# Trò ghép hình: một tấm ảnh chụp hai người, cắt đôi ở chỗ giữa hai người.
# (nguồn, tâm ngang của đường cắt 0..1, mép trên 0..1, mép dưới 0..1)
# Mảnh trái cố định, mảnh phải kéo vào. Hai mảnh chồng lên nhau ở phần tai ghép (0.18 bề ngang mảnh),
# nên vùng cắt rộng 1.82 lần một mảnh. PUZZLE_RATIO phải khớp với puzzle.ratio trong src/config.js.
PUZZLE = ('anh-1.JPG', 0.52, 0.20, 0.94)
PUZZLE_RATIO = 2.1  # cao / rộng của mỗi mảnh
PUZZLE_W = 400


def puzzle_pieces(img, cx, top, bottom):
    h = (bottom - top) * img.height
    w = h / PUZZLE_RATIO
    total = 1.82 * w
    left = min(max(cx * img.width - total / 2, 0), img.width - total)
    y0, y1 = top * img.height, bottom * img.height
    size = (PUZZLE_W, round(PUZZLE_W * PUZZLE_RATIO))
    a = img.crop((round(left), round(y0), round(left + w), round(y1))).resize(size, Image.LANCZOS)
    b = img.crop((round(left + total - w), round(y0), round(left + total), round(y1))).resize(size, Image.LANCZOS)
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
    name, cx, top, bottom = PUZZLE
    img = ImageOps.exif_transpose(Image.open(src / name)).convert('RGB')
    for piece, out in zip(puzzle_pieces(img, cx, top, bottom), ('puzzle-left.webp', 'puzzle-right.webp')):
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
