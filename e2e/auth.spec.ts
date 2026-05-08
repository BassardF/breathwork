import { test, expect } from '@playwright/test';

test('renders login page with auth form', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByText('Personal Practice')).toBeVisible();
  await expect(page.getByText('Login in local mode')).toBeVisible();
});

test('login in local mode redirects to hold page', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Login in local mode' }).click();
  await expect(
    page.getByRole('heading', { name: 'Max Breath Hold' }),
  ).toBeVisible();
});

test('protected route redirects to login when not authenticated', async ({
  page,
}) => {
  await page.goto('/hold');
  await expect(page.getByText('Personal Practice')).toBeVisible();
  await expect(page.getByText('Login in local mode')).toBeVisible();
});

test('login page has no nav sidebar', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('aside')).not.toBeVisible();
});
