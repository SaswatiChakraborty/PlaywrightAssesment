import { test, expect, Page } from '@playwright/test';

test.describe('Verify user can add a new customer', () => {
let page = Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.getByRole('textbox', { name: 'Email' }).fill('sastestuser@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Add a New Contact' })).toBeVisible();
  await expect(page.getByText('Click on any contact to view')).toBeVisible();
  await page.waitForSelector('button#add-contact', { timeout: 5000 });
});

test('Add new User', async ({ page }) => {
   await page.getByRole('button', { name: 'Add a New Contact' }).click();
   await page.getByRole('textbox', { name: '* First Name:' }).fill('James');
   await page.getByRole('textbox', { name: '* Last Name:' }).fill('Overman');
   await page.getByRole('textbox', { name: 'Date of Birth:' }).fill('1984-06-12');
   await page.getByRole('textbox', { name: 'Email:' }).fill('example1@test.com');
   await page.getByRole('textbox', { name: 'Phone:' }).fill('61785683');
   await page.getByRole('textbox', { name: 'Street Address 1:' }).fill('74 Scotsburn Rd');
   await page.getByRole('textbox', { name: 'City:' }).fill('Syston');
   await page.getByRole('textbox', { name: 'State or Province:' }).fill('Wales');
   await page.getByRole('textbox', { name: 'Postal Code:' }).fill('324789');
   await page.getByRole('textbox', { name: 'Country:' }).fill('United Kingdom');
   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.getByText('Click on any contact to view')).toBeVisible();
   await expect(page.locator('#myTable')).toContainText('James Overman');
  });

  test('Verify error message for invalid login', async ({ page }) => {
     await page.getByRole('button', { name: 'Add a New Contact' }).click();
     await page.getByRole('button', { name: 'Submit' }).click();
     await expect(page.getByText('Contact validation failed:')).toBeVisible();
     await expect(page.locator('#error')).toContainText('Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.');
  });

  test('Verify error message for empty login', async ({ page }) => {
   await page.getByRole('button', { name: 'Add a New Contact' }).click();
   await page.getByRole('textbox', { name: '* First Name:' }).fill('Jonathan');
   await page.getByRole('textbox', { name: '* Last Name:' }).fill('Jonathan');
   await page.getByRole('textbox', { name: 'Date of Birth:' }).fill('1987-07-20');
   await page.getByRole('textbox', { name: 'Email:' }).fill('1234');
   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.locator('#error')).toContainText('email: Email is invalid');

  });

  test.afterAll(async () => {
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.getByText('Not yet a user? Click here to')).toBeVisible();
    });

  })