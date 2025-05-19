import { test, expect } from '@playwright/test';

test('Verify user can successfully log in', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.getByRole('textbox', { name: 'Email' }).fill('sastestuser@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Add a New Contact' })).toBeVisible();
  await expect(page.getByText('Click on any contact to view')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByText('Not yet a user? Click here to')).toBeVisible();
  });

  test('Verify error message for invalid login', async ({ page }) => {
     await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
     await page.getByRole('textbox', { name: 'Email' }).fill('testuser1234@example.com');
     await page.getByRole('textbox', { name: 'Password' }).fill('newpassword');
     await page.getByRole('button', { name: 'Submit' }).click();
     await expect(page.locator('#error')).toContainText('Incorrect username or password');
  });

  test('Verify error message for empty login', async ({ page }) => {
     await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
     await page.getByRole('textbox', { name: 'Email' }).fill('');
     await page.getByRole('textbox', { name: 'Password' }).fill('');
     await page.getByRole('button', { name: 'Submit' }).click();
     await expect(page.locator('#error')).toContainText('Incorrect username or password');
  });