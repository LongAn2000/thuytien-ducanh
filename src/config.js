// Toàn bộ nội dung thiệp. Đường dẫn ảnh tính từ thư mục public/.
// Ngày giờ, địa điểm, tên bố mẹ hiện là dữ liệu minh họa — thay bằng thông tin thật.

export const couple = {
  groom: 'Đức Anh',
  bride: 'Thủy Tiên',
  groomFull: 'Nguyễn Đức Anh',
  brideFull: 'Trần Thủy Tiên',
  hashtag: '#DucAnhCuoiThuyTien',
  // Chữ viết tắt dưới "Save the date" ở trang bìa.
  monogram: ['A', 'T'],
};

// Giờ đón khách, có múi giờ +07:00. Lịch "đếm ngược" tự tính từ ngày này.
export const weddingDate = '2026-12-20T17:30:00+07:00';

export const dateLabel = {
  weekday: 'Chủ Nhật',
  day: '20',
  month: '12',
  year: '2026',
};

export const meta = {
  title: 'Đức Anh & Thủy Tiên — 20.12.2026',
  description: 'Thiệp cưới của Nguyễn Đức Anh và Trần Thủy Tiên. Chủ Nhật, ngày 20.12.2026.',
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
  note: '36 kiểu, tụi mình chọn ra mấy tấm ưng nhất.',
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
  pieces: [
    { src: 'photos/puzzle-left.webp', alt: 'Cô dâu' },
    { src: 'photos/puzzle-right.webp', alt: 'Chú rể' },
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
      { role: 'Bố iu', name: 'Nguyễn Văn A' },
      { role: 'Mẹ iu', name: 'Lê Thị B' },
    ],
  },
  {
    side: 'Nhà gái',
    people: [
      { role: 'Bố iu', name: 'Trần Văn C' },
      { role: 'Mẹ iu', name: 'Phạm Thị D' },
    ],
  },
];

export const venue = {
  name: 'Trung tâm tiệc cưới',
  hall: 'Sảnh A',
  address: 'Số nhà, đường, quận, Hà Nội',
  mapUrl: 'https://maps.google.com/?q=Ha+Noi',
  note: 'Tới sớm một chút để còn kịp chụp hình với tụi mình nha.',
  illustration: 'art/venue.webp',
};

export const agenda = {
  eyebrow: 'Agenda',
  hint: 'vuốt sang phải để xem tiếp',
  likeHint: 'chạm vào ảnh để thả tim',
  // Tiệc "intimate" chỉ hiện với khách được đánh dấu intimate (cần sheetEndpoint + link ?to=slug).
  parties: [
    {
      id: 'intimate',
      tab: 'Tiệc intimate',
      title: 'Buổi chiều của những người thân nhất',
      start: '15:00',
      end: '17:30',
      items: [
        { time: '15:00', title: 'Welcoming', note: 'Photobooth, tiệc sún răng', photo: 'photos/agenda-01.webp', alt: '' },
        { time: '16:00', title: 'Vows ceremony', photo: 'photos/agenda-02.webp', alt: '' },
        { time: '16:45', title: 'Gap time', note: 'Nghỉ ngơi, chờ tiệc chính', photo: 'photos/agenda-03.webp', alt: '' },
      ],
    },
    {
      id: 'main',
      tab: 'Tiệc chính',
      title: 'Buổi tối hôm đó sẽ diễn ra như vầy',
      start: '17:30',
      end: '21:00',
      items: [
        { time: '17:30', title: 'Đón khách', photo: 'photos/agenda-04.webp', alt: '' },
        { time: '18:00', title: 'Làm lễ', photo: 'photos/agenda-05.webp', alt: '' },
        { time: '18:30', title: 'Khai tiệc', photo: 'photos/agenda-06.webp', alt: '' },
        { time: '19:30', title: 'Games & quẩy', photo: 'photos/agenda-07.webp', alt: '' },
      ],
    },
  ],
};

export const dresscode = {
  title: 'Đừng quan trọng màu sắc hay phong cách',
  note: 'Hãy cùng nhau lên ảnh thật đẹp 🩲👙',
  frames: ['photos/pose-a.webp', 'photos/pose-b.webp'],
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
  humans: ['photos/crew-her.webp', 'photos/crew-him.webp'],
  pets: ['photos/crew-pet-1.webp', 'photos/crew-pet-2.webp', 'photos/crew-pet-3.webp'],
  petsCaption: 'và hội bạn thân',
};

// URL Google Apps Script nhận RSVP (POST JSON) và tra khách theo ?to=slug (GET).
// Để trống: câu trả lời chỉ lưu trong localStorage của trình duyệt khách.
export const sheetEndpoint = '';
