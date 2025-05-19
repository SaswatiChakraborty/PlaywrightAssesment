import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://blazedemo.com/index.php');
  await page.locator('select[name="fromPort"]').selectOption('Philadelphia');
  await page.locator('select[name="toPort"]').selectOption('New York');
  await page.getByRole('button', { name: 'Find Flights' }).click();

  await expect(page.getByRole('cell', { name: 'Lufthansa' })).toBeVisible();
  await page.getByRole('row', { name: 'Choose This Flight 4346' }).getByRole('button').click();
  // await page.locator("//td[normalize-space()='Lufthansa']/../td/input").click();
  await page.getByPlaceholder('First Last').fill('Jane Austen');
  await page.getByPlaceholder('123 Main St.').fill('1246 Gill Hall Rd');
  await page.locator('#city').fill('Clairton');
  await page.locator('input#state').fill('Pennsylvania');
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('15025');
  await page.getByRole('textbox', { name: 'Credit Card Number' }).fill('378282246310005');
  await page.getByRole('textbox', { name: 'Name on Card' }).fill('Jane Austen');
  await page.getByRole('button', { name: 'Purchase Flight' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your purchase' })).toBeVisible();
});