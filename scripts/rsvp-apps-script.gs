/**
 * Nhận RSVP của thiệp cưới vào Google Sheet.
 *
 * Sheet nhận dữ liệu: "ducanh-thuytien"
 *   https://docs.google.com/spreadsheets/d/1lKRS3yLK67OwYYNp8KetAMWScPblIPRfaLnnfdChGpM/edit
 *
 * Cài đặt:
 * 1. Mở Sheet trên → Tiện ích mở rộng → Apps Script, xoá code mẫu, dán toàn bộ file này vào, bấm Lưu.
 * 2. (Không bắt buộc) chọn hàm setup ở thanh trên cùng rồi bấm Chạy để kiểm tra quyền.
 * 3. Triển khai → Tùy chọn triển khai mới → loại "Ứng dụng web":
 *      Thực thi với tư cách: Tôi
 *      Người có quyền truy cập: Bất kỳ ai
 *    Bấm Triển khai, cấp quyền, rồi chép "URL ứng dụng web" (đuôi /exec) vào sheetEndpoint trong src/config.js.
 * Sửa script về sau: Triển khai → Quản lý triển khai → sửa (bút chì) → Phiên bản: Phiên bản mới, để giữ nguyên URL.
 *
 * Tab đầu tiên của Sheet: mỗi lần khách gửi form thêm một dòng (tự thêm dòng tiêu đề nếu tab còn trống).
 * Tab "Khách mời" (không bắt buộc): cột A = slug, B = tên hiển thị, C = loại (general / intimate).
 *   Link thiệp ...?to=<slug> sẽ hiện "Dear <tên>," và tự điền tên vào form.
 */

const SPREADSHEET_ID = '1lKRS3yLK67OwYYNp8KetAMWScPblIPRfaLnnfdChGpM';
const GUEST_SHEET = 'Khách mời';
const HEADERS = ['Thời gian', 'Tên', 'Có đi không', 'Số người đi cùng', 'Tên người đi cùng', 'Lời nhắn', 'Slug'];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = rsvpSheet();
    sheet.appendRow([
      new Date(data.submittedAt || Date.now()),
      clean(data.name),
      data.attending === 'yes' ? 'Có' : 'Không',
      Number(data.companions) || 0,
      clean(data.companionNames),
      clean(data.note),
      clean(data.slug),
    ]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

function doGet(e) {
  const slug = String((e.parameter && e.parameter.slug) || '').trim().toLowerCase();
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUEST_SHEET);
  if (!slug || !sheet) return json({ ok: false });
  const row = sheet
    .getDataRange()
    .getValues()
    .find(r => String(r[0]).trim().toLowerCase() === slug);
  if (!row) return json({ ok: false });
  return json({ ok: true, name: String(row[1]), type: String(row[2] || 'general').trim() });
}

function rsvpSheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Chạy tay một lần trong trình soạn Apps Script để cấp quyền và tạo dòng tiêu đề.
function setup() {
  rsvpSheet();
}

// Chặn công thức: ô bắt đầu bằng = + - @ sẽ được thêm dấu ' để Sheet hiểu là chữ.
function clean(value) {
  const s = String(value || '').slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
