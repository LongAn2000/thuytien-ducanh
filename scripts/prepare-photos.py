"""Cắt và nén ảnh cưới vào public/photos theo đúng khung của từng phần thiệp.

Chạy:  python3 scripts/prepare-photos.py "/đường/dẫn/thư/mục/ảnh"

Sửa bảng PHOTOS bên dưới để đổi ảnh: (tên file nguồn, tên file đích, rộng, cao, tâm ngang 0..1, tâm dọc 0..1).
Tâm ngang/dọc là điểm muốn giữ ở giữa khung khi phải cắt bớt ảnh.
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

PHOTOS = [
    # Trang bìa: tấm ảnh in ra từ máy in
    ('589770896_122109684483076279_1514773859865845385_n.jpg', 'hero.webp', 708, 1008, 0.50, 0.5),
    # Album cuộn phim
    ('586143593_122109683073076279_7063071330708215337_n.jpg', 'gallery-01.webp', 760, 541, 0.5, 0.5),
    ('586504001_122109687141076279_7833855155645748646_n.jpg', 'gallery-02.webp', 760, 541, 0.5, 0.5),
    ('587349570_122109705867076279_5641221705758553046_n.jpg', 'gallery-03.webp', 760, 541, 0.5, 0.5),
    ('588550431_122109684405076279_2286628620254147074_n.jpg', 'gallery-04.webp', 760, 541, 0.5, 0.5),
    ('588648735_122109684519076279_7816291645383518564_n.jpg', 'gallery-05.webp', 760, 541, 0.5, 0.5),
    ('BK0X0917.jpg', 'gallery-06.webp', 760, 541, 0.5, 0.5),
    ('BK0X0979.jpg', 'gallery-07.webp', 760, 541, 0.5, 0.5),
    ('BK0X0998.jpg', 'gallery-08.webp', 760, 541, 0.5, 0.5),
    ('HPMD8821.jpg', 'gallery-09.webp', 760, 541, 0.5, 0.5),
    ('HPMD8871 (1).jpg', 'gallery-10.webp', 760, 541, 0.5, 0.5),
    # Trò ghép hình: mảnh trái (cố định) và mảnh phải (kéo)
    ('HPMD8764.jpg', 'puzzle-left.webp', 620, 620, 0.48, 0.5),
    ('588624339_122109685179076279_1477259539468161762_n.jpg', 'puzzle-right.webp', 620, 620, 0.50, 0.5),
    # Lịch
    ('588052333_122109690579076279_479169578053949761_n.jpg', 'cal-photo-1.webp', 560, 700, 0.50, 0.5),
    ('HPMD8845.jpg', 'cal-photo-2.webp', 440, 550, 0.52, 0.5),
    # Chương trình (Agenda)
    ('588325864_122109685017076279_1468488471659980224_n.jpg', 'agenda-01.webp', 560, 747, 0.52, 0.5),
    ('588629552_122109690525076279_7759529890158817285_n.jpg', 'agenda-02.webp', 560, 747, 0.55, 0.5),
    ('588474527_122109700911076279_4001402832576943143_n.jpg', 'agenda-03.webp', 560, 747, 0.50, 0.5),
    ('HPMD8863.jpg', 'agenda-04.webp', 560, 747, 0.50, 0.5),
    ('587506872_122109685053076279_8925964118375810703_n.jpg', 'agenda-05.webp', 560, 747, 0.50, 0.5),
    ('588910722_122109686019076279_1536308769434441643_n.jpg', 'agenda-06.webp', 560, 747, 0.53, 0.5),
    ('588061613_122109684549076279_9139828419358292696_n.jpg', 'agenda-07.webp', 560, 747, 0.50, 0.5),
    # Dresscode: hai khung hình lật qua lại
    ('HPMD8764.jpg', 'pose-a.webp', 760, 596, 0.48, 0.5),
    ('HPMD8772.jpg', 'pose-b.webp', 760, 596, 0.48, 0.5),
]

# Lời cảm ơn: ảnh tròn kiểu sticker (thay cho tranh vẽ cô dâu chú rể và thú cưng)
STICKERS = [
    ('588052333_122109690579076279_479169578053949761_n.jpg', 'crew-her.webp', 0.50, 0.34),
    ('HPMD8845.jpg', 'crew-him.webp', 0.52, 0.34),
    ('589770896_122109684483076279_1514773859865845385_n.jpg', 'crew-pet-1.webp', 0.50, 0.34),
    ('588474527_122109700911076279_4001402832576943143_n.jpg', 'crew-pet-2.webp', 0.50, 0.34),
    ('588336579_122109691257076279_2365343141965804518_n.jpg', 'crew-pet-3.webp', 0.50, 0.34),
]


def cover(img, w, h, fx, fy):
    scale = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = min(max(round(img.width * fx - w / 2), 0), img.width - w)
    top = min(max(round(img.height * fy - h / 2), 0), img.height - h)
    return img.crop((left, top, left + w, top + h))


def sticker(img, fx, fy, size=360, border=14):
    side = round(min(img.width, img.height) * 0.55)
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
    src = Path(sys.argv[1] if len(sys.argv) > 1 else '/home/logan/Pictures/giải shopify')
    dst = Path(__file__).resolve().parent.parent / 'public' / 'photos'
    dst.mkdir(parents=True, exist_ok=True)
    for name, out, w, h, fx, fy in PHOTOS:
        img = ImageOps.exif_transpose(Image.open(src / name)).convert('RGB')
        cover(img, w, h, fx, fy).save(dst / out, 'WEBP', quality=82, method=6)
        print('ok', out)
    for name, out, fx, fy in STICKERS:
        img = ImageOps.exif_transpose(Image.open(src / name)).convert('RGB')
        sticker(img, fx, fy).save(dst / out, 'WEBP', quality=85, method=6)
        print('ok', out)


if __name__ == '__main__':
    main()
