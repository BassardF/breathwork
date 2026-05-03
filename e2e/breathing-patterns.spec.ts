import { test, expect } from '@playwright/test';
import { seedLocalStorage, navUrl } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedLocalStorage(page);
  await page.goto(navUrl('/patterns'));
});

test('renders breathing patterns with presets', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Breathing Pattern Trainer' }),
  ).toBeVisible();
  await expect(page.getByText('Guided rhythm work')).toBeVisible();
  await expect(page.getByText('Box Breathing')).toBeVisible();
  await expect(page.getByText('Cardiac Coherence')).toBeVisible();
  await expect(page.getByText('Custom pattern', { exact: true })).toBeVisible();
});

test('selects a preset pattern and shows its description', async ({ page }) => {
  await page.getByText('4-7-8').first().click();
  await expect(page.getByText("Dr. Weil")).toBeVisible();
});

test('starts a breathing session', async ({ page }) => {
  await page.getByRole('button', { name: 'Start session' }).click();
  await expect(page.getByText(/Cycle 1 of/)).toBeVisible();
});

test('ends a breathing session', async ({ page }) => {
  await page.getByRole('button', { name: 'Start session' }).click();
  await expect(page.getByText(/Cycle 1 of/)).toBeVisible();
  await page.getByRole('button', { name: 'End session' }).click();
  await expect(page.getByText('Session saved')).toBeVisible();
});

test('switches between presets shows different phase summaries', async ({ page }) => {
  await page.getByText('Box Breathing').click();
  await expect(page.getByText('4-4-4-4')).toBeVisible();

  await page.getByText('Cardiac Coherence').click();
  await expect(page.getByText('5-5', { exact: true })).toBeVisible();
});

test('shows learn link', async ({ page }) => {
  await expect(page.getByText('Learn why this works')).toBeVisible();
});
