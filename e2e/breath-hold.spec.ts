import { test, expect } from '@playwright/test';
import { seedLocalStorage, navUrl } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedLocalStorage(page);
  await page.goto(navUrl('/'));
});

test('shows leaderboard and starts a hold session', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Leaderboard' })).toBeVisible();
  await expect(page.getByText('No recorded holds yet.')).toBeVisible();

  await page.getByRole('button', { name: 'Start test' }).click();
  await expect(page.getByText('Get ready')).toBeVisible();

  await page.waitForTimeout(11000);

  await expect(page.getByText('Holding')).toBeVisible();
  await page.getByRole('button', { name: 'Stop' }).click();

  await expect(page.getByText('Recorded')).toBeVisible();
  await expect(page.getByText('No recorded holds yet.')).not.toBeVisible();
});

test('deletes an entry from the leaderboard', async ({ page }) => {
  await page.getByRole('button', { name: 'Start test' }).click();
  await page.waitForTimeout(12000);
  await page.getByRole('button', { name: 'Stop' }).click();
  await expect(page.getByText('Recorded')).toBeVisible();

  await page.locator('button[aria-label="Delete entry"]').click();
  await expect(page.getByText('Delete entry')).toBeVisible();
  await expect(page.getByText('This will permanently remove')).toBeVisible();

  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await expect(page.getByText('No recorded holds yet.')).toBeVisible();
});

test('cancels delete from the leaderboard', async ({ page }) => {
  await page.getByRole('button', { name: 'Start test' }).click();
  await page.waitForTimeout(12000);
  await page.getByRole('button', { name: 'Stop' }).click();
  await expect(page.getByText('Recorded')).toBeVisible();

  await page.locator('button[aria-label="Delete entry"]').click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await expect(page.getByText('No recorded holds yet.')).not.toBeVisible();
});
