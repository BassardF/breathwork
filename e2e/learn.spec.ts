import { test, expect } from '@playwright/test';
import { seedLocalStorage, navUrl } from './helpers';

test.beforeEach(async ({ page }) => {
  await seedLocalStorage(page);
  await page.goto(navUrl('/learn'));
});

test('renders learn page with goal filters and sections', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Learn' })).toBeVisible();
  await expect(page.getByText('What do you want to work on?')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'All', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Training Sections', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Physiology Concepts', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Static Apnea')).toBeVisible();
  await expect(page.getByText('CO₂ Tolerance Table')).toBeVisible();
  await expect(page.getByText('O₂ Tolerance Table').first()).toBeVisible();
});

test('filters by goal', async ({ page }) => {
  await page
    .getByText('Improve focus and concentration', { exact: true })
    .click();
  await expect(page.getByText('Box breathing')).toBeVisible();
});

test('expands a section article', async ({ page }) => {
  await page.getByRole('button', { name: /^S Static Apnea/ }).click();
  await expect(page.getByText('Why', { exact: true })).toBeVisible();
  await expect(page.getByText('How', { exact: true })).toBeVisible();
});

test('expands a physiology concept', async ({ page }) => {
  await page.getByRole('button', { name: /^C CO₂ Tolerance The/ }).click();
  await expect(page.getByText('What is CO₂ tolerance?')).toBeVisible();
});

test('navigates from learn link on hold page', async ({ page }) => {
  await page.goto(navUrl('/hold'));
  await page.getByText('Learn why this works').click();
  await expect(page.getByRole('heading', { name: 'Learn' })).toBeVisible();
});

test('shows all goals as filter pills', async ({ page }) => {
  const goals = [
    'Hold my breath longer',
    'Reduce anxiety and panic',
    'Improve focus',
    'Sleep better and fall asleep faster',
    'Manage daily stress',
    'Track and measure progress',
    'Build mental resilience',
    'Reduce panic during breath holds',
    'Improve recovery between efforts',
  ];

  for (const goal of goals) {
    await expect(page.getByRole('button', { name: goal })).toBeVisible();
  }
});
