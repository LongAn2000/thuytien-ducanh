import { defineConfig } from 'vite';

// Thiệp chạy ở gốc tên miền riêng https://ducanhthuytien.online/ (xem public/CNAME).
export default defineConfig(() => ({
  base: '/',
  // Keep CSS syntax older iPhones understand, e.g. (max-width: …) instead of (width <= …).
  build: { cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14', 'ios14'] },
}));
