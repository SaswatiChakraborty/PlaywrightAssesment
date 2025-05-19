import { readFileSync } from 'fs';
import { join } from 'path';
import { test, expect, Page } from '@playwright/test';
const assert = require('assert')
import { parse } from 'csv-parse/sync';

const records = parse(readFileSync(join('./tests/TestData/', 'Create_Notes_With_diffOption.csv')), {
  columns: true,
  skip_empty_lines: true,
});

test.describe('Create Notes for different Options Using CSV', () => {
let page = Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('https://practice.expandtesting.com/notes/app');
  await expect(page.getByRole('heading', { name: 'Welcome to Notes App' })).toBeVisible();
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://practice.expandtesting.com/notes/app/login');
  await page.getByTestId('login-email').fill('Saswati@abc.com');
  await page.getByTestId('login-password').fill('test1234');
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL('https://practice.expandtesting.com/notes/app');
});

test('Create notes - with csv data', async () => {
    for(const record of records){
      console.log(records);
      await page.getByTestId('add-new-note').click();
        // await page.pause();
            
      await expect(page.getByText('Add new note')).toBeVisible(); 
      await page.getByTestId('note-category').selectOption(record.NoteCategory);
      await page.getByTestId('note-title').fill(record.NoteTitle);
      await page.getByTestId('note-description').fill(record.NoteDescription);
      await page.getByTestId('note-submit').click();
            
      await expect(page.locator("//div[text()='" + record.NoteTitle + "']")).toBeVisible();
      await page
        .locator(
            "//div[text()='" +data.NoteTitle +"']//following-sibling::div/div/button[normalize-space()='Delete']").click();
      await expect(page.getByTestId('logout')).toBeVisible();
    }
});

    test.afterAll(async () => {
        await page.getByTestId('logout').click();
        await expect(page).toHaveURL("https://practice.expandtesting.com/notes/app");
        await expect(page.getByRole('heading', { name: 'Welcome to Notes App' })).toBeVisible();
    });
})