import { test, expect } from '@playwright/test';
import { seedLocalStorage, navUrl } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedLocalStorage(page);
});

test('renders statistics page with history', async ({ page }) => {
  await page.goto(navUrl('/stats'));
  await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible();
  await expect(page.getByText('Personal records')).toBeVisible();
});

test('shows session history content', async ({ page }) => {
  await page.goto(navUrl('/'));
  await page.getByRole('button', { name: 'Start test' }).click();
  await page.waitForTimeout(12000);
  await page.getByRole('button', { name: 'Stop' }).click();

  await page.goto(navUrl('/stats'));
  await expect(
    page.getByRole('heading', { name: 'Session history' }),
  ).toBeVisible();

  await page.locator('details summary').first().click();
  await expect(page.getByText('Type:')).toBeVisible();
});

test('shows type filter buttons', async ({ page }) => {
  await page.goto(navUrl('/stats'));
  await expect(page.getByRole('button', { name: 'All', exact: true })).toBeVisible();
  await expect(page.getByText('Breath Hold', { exact: true })).toBeVisible();
  await expect(page.getByText('CO2 Table', { exact: true })).toBeVisible();
  await expect(page.getByText('O2 Table', { exact: true })).toBeVisible();
  await expect(page.getByText('Breathing', { exact: true })).toBeVisible();
});
