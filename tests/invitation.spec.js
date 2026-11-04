import { test, expect } from '@playwright/test';

test('in ảnh, ghép hình mở khóa thông tin, thả tim và RSVP', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  // Không gửi RSVP thử vào Google Sheet thật.
  const posted = [];
  await page.route('https://script.google.com/**', route => {
    if (route.request().method() === 'POST') posted.push(JSON.parse(route.request().postData()));
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":false}' });
  });
  await page.goto('/');

  const hero = page.locator('#hero');
  await page.getByRole('button', { name: /print now/i }).click();
  await expect(hero).toHaveClass(/hero__printing/);
  await expect(hero).toHaveClass(/hero__done/, { timeout: 5000 });
  await expect(page.locator('h1')).toHaveText('Đức Anh');

  const details = page.locator('#thong-tin');
  await expect(details).toHaveClass(/details__locked/);
  const piece = page.locator('.puzzle__piece');
  await piece.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.puzzle__board')).toHaveClass(/puzzle__solved/);
  await expect(details).not.toHaveClass(/details__locked/);

  const tap = page.locator('#agenda .agenda__tap').first();
  await tap.click();
  await expect(tap).toHaveAttribute('aria-pressed', 'true');
  await expect(tap.locator('.agenda__heart')).toHaveAttribute('data-on', 'true');

  await page.locator('input[name=companions][value="2"]').check();
  await expect(page.locator('#rsvp-companions')).toBeVisible();
  await page.fill('#rsvp-name', 'Khách thử');
  await page.getByRole('button', { name: /xác nhận/i }).click();
  await expect(page.getByText('Nhận được rồi nè!')).toBeVisible();
  expect(posted).toEqual([expect.objectContaining({ name: 'Khách thử', attending: 'yes', companions: 2 })]);

  for (const width of [320, 375, 430, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('link ?ca=chieu đổi giờ tiệc nhà gái sang 15:00', async ({ page }) => {
  const brideParty = page.locator('.details__venue').filter({ hasText: 'Tiệc cưới nhà gái' });
  await page.goto('/');
  await expect(brideParty).toContainText('05.12.2026 · 10:00');
  await page.goto('/?ca=chieu');
  await expect(brideParty).toContainText('05.12.2026 · 15:00');
  await expect(page.locator('.details__venue').filter({ hasText: 'Lễ thành hôn' })).toContainText('10:00');
});
