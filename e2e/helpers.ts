import type { Page } from '@playwright/test';

export async function seedLocalStorage(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('apnea-local-mode', 'true');
    window.localStorage.setItem('apnea-safety-acknowledged', 'true');
  });
}

export function navUrl(path: string): string {
  return path;
}
