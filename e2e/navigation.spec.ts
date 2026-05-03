import { test, expect } from '@playwright/test';
import { seedLocalStorage, navUrl } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedLocalStorage(page);
});

test('navigates all routes via sidebar', async ({ page }) => {
  await page.goto(navUrl('/'));

  await expect(page.getByRole('heading', { name: 'Max Breath Hold' })).toBeVisible();

  const sidebar = page.locator('aside');
  const links = [
    { label: 'CO2', heading: 'CO2 Table' },
    { label: 'O2', heading: 'O2 Table' },
    { label: 'Breathe', heading: 'Breathing Pattern Trainer' },
    { label: 'Learn', heading: 'Learn' },
    { label: 'Stats', heading: 'Statistics' },
    { label: 'Hold', heading: 'Max Breath Hold' },
  ];

  for (const { label, heading } of links) {
    await sidebar.getByText(label, { exact: true }).click();
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
});
