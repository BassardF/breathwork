import { test, expect } from '@playwright/test';
import { seedLocalStorage, navUrl } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedLocalStorage(page);
  await page.goto(navUrl('/o2'));
});

test('renders O2 table setup with sliders and preview', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'O2 Table' })).toBeVisible();
  await expect(page.getByText('Fixed rest. Rising hold.')).toBeVisible();
  await expect(page.getByText('Start session')).toBeVisible();
  await expect(page.getByText('Preview')).toBeVisible();
  await expect(page.getByText('#1')).toBeVisible();
  await expect(page.getByText('#8')).toBeVisible();
});

test('starts an O2 session and shows rest phase', async ({ page }) => {
  await page.getByRole('button', { name: 'Start session' }).click();
  await expect(page.getByText('rest phase')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Round 1 of 8')).toBeVisible();
});

test('ends an O2 session early', async ({ page }) => {
  await page.getByRole('button', { name: 'Start session' }).click();
  await expect(page.getByText('rest phase')).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: 'End early' }).click();
  await expect(page.getByText('Session summary')).toBeVisible();
  await expect(page.getByText('Complete')).toBeVisible();
  await expect(page.getByText('All 8 rounds finished')).toBeVisible();
});

test('shows info and tips section', async ({ page }) => {
  await page.getByText('Info & Tips').click();
  await expect(page.getByText(/low oxygen/i)).toBeVisible();
  await expect(page.getByText('Learn why this works')).toBeVisible();
});
