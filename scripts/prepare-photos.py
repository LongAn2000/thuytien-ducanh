"""Cắt và nén ảnh cưới vào public/photos theo đúng khung của từng phần thiệp.

Chạy:  python3 scripts/prepare-photos.py "/đường/dẫn/thư/mục/ảnh"

Sửa bảng PHOTOS bên dưới để đổi ảnh: (tên file nguồn, tên file đích, rộng, cao, tâm ngang 0..1, tâm dọc 0..1).
Tâm ngang/dọc là điểm muốn giữ ở giữa khung khi phải cắt bớt ảnh. Có thể thêm số thứ 7 là độ zoom (mặc định 1).
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

PHOTOS = [
    # Trang bìa: tấm ảnh in ra từ máy in
    ('DSC09602 --- in.jpg', 'hero.webp', 708, 1008, 0.50, 0.40),
    # Album cuộn phim (khung ngang)
    ('DSC08775.jpg', 'gallery-01.webp', 760, 541, 0.50, 0.50),
    ('PVT03944.jpg', 'gallery-02.webp', 760, 541, 0.55, 0.50),
    ('DSC09659.jpg', 'gallery-03.webp', 760, 541, 0.50, 0.50),
    ('DSC09676.jpg', 'gallery-04.webp', 760, 541, 0.50, 0.30),
    ('DSC08490.jpg', 'gallery-05.webp', 760, 541, 0.50, 0.62),
    ('DSC09899.jpg', 'gallery-06.webp', 760, 541, 0.45, 0.50),
    ('PVT04180.jpg', 'gallery-07.webp', 760, 541, 0.50, 0.66),
    ('DSC09962.jpg', 'gallery-08.webp', 760, 541, 0.50, 0.38),
    ('PVT04262.jpg', 'gallery-09.webp', 760, 541, 0.50, 0.50),
    ('DSC09226.jpg', 'gallery-10.webp', 760, 541, 0.50, 0.38),
    # Trò ghép hình: mảnh trái (cô dâu, cố định) và mảnh phải (chú rể, kéo)
    ('DSC09586.jpg', 'puzzle-left.webp', 620, 620, 0.47, 0.32, 2.0),
    ('DSC00025.jpg', 'puzzle-right.webp', 620, 620, 0.49, 0.29, 1.8),
    # Lịch
    ('DSC09857.jpg', 'cal-photo-1.webp', 560, 700, 0.50, 0.35),
    ('DSC09912.jpg', 'cal-photo-2.webp', 440, 550, 0.50, 0.35),
    # Chương trình (Agenda)
    ('DSC09525.jpg', 'agenda-01.webp', 560, 747, 0.50, 0.55),
    ('DSC00015.jpg', 'agenda-02.webp', 560, 747, 0.50, 0.40),
    ('DSC09177.JPG', 'agenda-03.webp', 560, 747, 0.50, 0.50),
    ('DSC08879.jpg', 'agenda-04.webp', 560, 747, 0.50, 0.55),
    ('DSC09438.jpg', 'agenda-05.webp', 560, 747, 0.55, 0.50),
    ('DSC09995.jpg', 'agenda-06.webp', 560, 747, 0.50, 0.45),
    ('DSC08956.jpg', 'agenda-07.webp', 560, 747, 0.50, 0.55),
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
        img = Image.open(src / name)
        img.draft('RGB', (2 * max(w, h) * (zoom[0] if zoom else 1),) * 2)
        img = ImageOps.exif_transpose(img).convert('RGB')
        cover(img, w, h, fx, fy, *zoom).save(dst / out, 'WEBP', quality=82, method=6)
        print('ok', out)
    for name, out, fx, fy, *frac in STICKERS:
        img = ImageOps.exif_transpose(Image.open(src / name)).convert('RGB')
        sticker(img, fx, fy, *frac).save(dst / out, 'WEBP', quality=85, method=6)
        print('ok', out)


if __name__ == '__main__':
    main()
