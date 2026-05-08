import { test, expect } from '@playwright/test';
import { seedLocalStorage } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedLocalStorage(page);
});

test('renders landing page with get started link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Get Started')).toBeVisible();
});

test('get started navigates through auth to the app', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Get Started').click();
  await expect(
    page.getByRole('heading', { name: 'Max Breath Hold' }),
  ).toBeVisible();
});

test('landing page has no nav sidebar', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('aside')).not.toBeVisible();
});
