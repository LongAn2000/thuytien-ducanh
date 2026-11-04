// Toàn bộ nội dung thiệp. Đường dẫn ảnh tính từ thư mục public/.
// Thiệp bên nhà trai: lễ thành hôn 10:00 Chủ Nhật 06.12.2026 (tức 28/10 năm Bính Ngọ) tại Trung tâm văn hóa xã Thanh Trì.

export const couple = {
  groom: 'Đức Anh',
  bride: 'Thủy Tiên',
  groomFull: 'Nguyễn Đức Anh',
  brideFull: 'Trần Thị Thủy Tiên',
  hashtag: '#DucAnhCuoiThuyTien',
  // Chữ viết tắt dưới "Save the date" ở trang bìa.
  monogram: ['A', 'T'],
};

// Giờ đón khách, có múi giờ +07:00. Lịch "đếm ngược" tự tính từ ngày này.
export const weddingDate = '2026-12-06T09:30:00+07:00';

export const dateLabel = {
  weekday: 'Chủ Nhật',
  day: '06',
  month: '12',
  year: '2026',
};

export const meta = {
  title: 'Đức Anh & Thủy Tiên — 06.12.2026',
  description: 'Thiệp cưới của Nguyễn Đức Anh và Trần Thị Thủy Tiên. 10:00 Chủ Nhật, ngày 06.12.2026 tại Trung tâm văn hóa xã Thanh Trì, Hà Nội.',
};

export const hero = {
  photo: 'photos/hero.webp',
  invite: 'mời bạn đến với đám cưới của',
};

// Để trống src thì không hiện nút nhạc (giống mẫu). Ví dụ: src: 'music.mp3' (đặt file trong public/).
export const music = { src: '', title: '' };

export const gallery = {
  eyebrow: 'Album',
  title: 'Cuộn phim của tụi mình',
  note: '38 kiểu, tụi mình chọn ra mấy tấm ưng nhất.',
  hint: 'vuốt sang phải để xem tiếp',
  shots: Array.from({ length: 10 }, (_, i) => ({
    src: `photos/gallery-${String(i + 1).padStart(2, '0')}.webp`,
    alt: `Ảnh của Đức Anh và Thủy Tiên ${i + 1}`,
  })),
};

export const puzzle = {
  title: 'Ghép hai đứa lại nha',
  prompt: 'Kéo mảnh bên phải cho khớp vào mảnh bên trái',
  done: 'Khớp rồi! Thông tin lễ cưới mở ngay bên dưới nha.',
  locked: 'Ghép hai mảnh ảnh phía trên để mở phần này nha',
  // Một tấm ảnh cắt đôi ở giữa hai người (scripts/prepare-photos.py in ra ba giá trị này).
  // tab = mảnh phải có tai lồi sang trái ('left') hay mảnh trái có tai lồi sang phải ('right'),
  // ratio = cao/rộng của mảnh phải, left = bề ngang mảnh trái so với mảnh phải.
  tab: 'left',
  ratio: 1.871,
  left: 0.88,
  pieces: [
    { src: 'photos/puzzle-left.webp', alt: 'Chú rể' },
    { src: 'photos/puzzle-right.webp', alt: 'Cô dâu' },
  ],
};

export const calendar = {
  headHand: 'lịch của tụi mình',
  photos: ['photos/cal-photo-1.webp', 'photos/cal-photo-2.webp'],
  notes: { countdown: 'đếm ngược nè!', twoDays: 'còn 2 ngày', oneNight: 'còn 1 đêm nữa thôi', wedding: 'here come the bride' },
};

export const families = [
  {
    side: 'Nhà trai',
    people: [
      { role: 'Bố iu', name: 'Nguyễn Quang Lộc' },
      { role: 'Mẹ iu', name: 'Đỗ Phương Thảo' },
    ],
  },
  {
    side: 'Nhà gái',
    people: [
      { role: 'Bố iu', name: 'Trần Duy Thửa' },
      { role: 'Mẹ iu', name: 'Nguyễn Thị Chức' },
    ],
  },
];

// Các buổi tiệc, mỗi buổi một khối giống nhau (tiêu đề, địa điểm, giờ, địa chỉ, bản đồ).
export const venues = [
  {
    title: 'Lễ thành hôn',
    name: 'Trung tâm văn hóa xã Thanh Trì',
    hall: 'Chủ Nhật 06.12.2026 · 10:00',
    lunar: 'Tức ngày 28 tháng 10 năm Bính Ngọ',
    address: '20 Nguyễn Bặc, xã Thanh Trì, Hà Nội',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Trung+t%C3%A2m+v%C4%83n+h%C3%B3a+x%C3%A3+Thanh+Tr%C3%AC%2C+20+Nguy%E1%BB%85n+B%E1%BA%B7c%2C+Thanh+Tr%C3%AC%2C+H%C3%A0+N%E1%BB%99i',
    note: 'Tới sớm một chút để còn kịp chụp hình với tụi mình nha.',
    illustration: 'art/venue.webp',
  },
  {
    title: 'Tiệc cưới nhà gái',
    name: 'Tư gia nhà gái',
    hall: 'Thứ Bảy 05.12.2026 · 10:00',
    lunar: 'Tức ngày 27 tháng 10 năm Bính Ngọ',
    address: 'Phương Nhi, Thôn Phương Mai, xã Tân Minh, tỉnh Ninh Bình',
    mapUrl: 'https://maps.app.goo.gl/L2c2JPkQ2pCituM56',
    illustration: 'art/venue.webp',
  },
];

export const agenda = {
  eyebrow: 'Agenda',
  hint: 'vuốt sang phải để xem tiếp',
  likeHint: 'chạm vào ảnh để thả tim',
  // Thêm một buổi { id: 'intimate', ... } nếu muốn có tiệc riêng chỉ hiện với khách được đánh dấu intimate
  // (cần sheetEndpoint + link ?to=slug).
  parties: [
    {
      id: 'main',
      tab: 'Lễ thành hôn',
      title: 'Lễ thành hôn sẽ diễn ra như vầy',
      start: '09:30',
      end: '13:00',
      items: [
        { time: '09:30', title: 'Đón khách', photo: 'photos/agenda-04.webp', alt: '' },
        { time: '10:00', title: 'Làm lễ', photo: 'photos/agenda-05.webp', alt: '' },
        { time: '10:30', title: 'Dùng tiệc', photo: 'photos/agenda-06.webp', alt: '' },
        { time: '11:15', title: 'Game & quẩy', photo: 'photos/agenda-07.webp', alt: '' },
      ],
    },
  ],
};

export const dresscode = {
  title: 'Đừng quan trọng màu sắc hay phong cách',
  note: 'Hãy cùng nhau lên ảnh thật đẹp 🩲👙',
  // Các khung lật lần lượt như ảnh gif, mỗi khung hiện frameMs mili giây.
  frames: ['photos/pose-1.webp', 'photos/pose-2.webp', 'photos/pose-3.webp', 'photos/pose-4.webp'],
  frameMs: 600,
};

export const rsvp = {
  title: 'Bạn tới với tụi mình nha?',
  note: 'Nhắn giùm tụi mình một tiếng để còn chuẩn bị chỗ ngồi thật đẹp cho bạn.',
  attending: {
    intimate: 'Bạn sẽ có mặt cùng chúng mình từ chiều chứ?',
    general: 'Bạn sẽ có mặt cùng chúng mình chứ?',
    yes: 'Có chứ, tui tới!',
    no: 'Tiếc quá, tui bận mất rồi',
  },
  companions: {
    question: 'Bạn có đi cùng người thương không? Nếu có, hãy cho bọn mình biết để người thương cũng sẽ được đón chào chu đáo nhé 🎀',
    none: 'Tui đi một mình',
    max: 4,
    namesLabel: 'Tên người đi cùng',
    namesPlaceholder: 'Ví dụ: Ngọc Anh, Minh Thư',
  },
  message: {
    label: 'Nhắn cho tụi mình một câu nha',
    placeholder: 'Chúc hai đứa cưới xong vẫn còn thương nhau nhiều như vậy…',
  },
  closing: 'Nếu có câu hỏi hoặc cần trợ giúp, đừng ngại nhắn cho cô dâu chú rể nhé 🎀 Luôn có mặt 💓',
  successTitle: 'Nhận được rồi nè!',
  successNote: 'Cảm ơn bạn thiệt nhiều. Tụi mình sẽ giữ sẵn một chỗ ngồi xinh xinh cho bạn.',
};

export const thankYou = {
  lead: 'Hẹn gặp bạn ở đám cưới, nhớ đói bụng sẵn nha!',
  sign: 'Thương nhiều, Đức Anh & Thủy Tiên',
  // Tranh chibi cô dâu chú rể (một tấm chung). Có thể thay bằng humans: [ảnh 1, ảnh 2] để hiện hai ảnh tròn.
  chibi: 'art/draw/chibi.webp',
  humans: [],
  pets: [],
  petsCaption: '',
};

// URL Google Apps Script nhận RSVP (POST JSON) và tra khách theo ?to=slug (GET).
// Để trống: câu trả lời chỉ lưu trong localStorage của trình duyệt khách.
export const sheetEndpoint = '';
