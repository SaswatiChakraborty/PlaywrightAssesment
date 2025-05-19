import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

// Reads the JSON file and saves it  
let objects = readFileSync('./tests/TestData/create_notes_different_options.json')
const orders = JSON.parse(objects);

test.describe('Create Notes for different Options', () => {
let page;

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

for(const data of orders){
    test(`Create notes - with differnt options: ${data.TestCaseID}`, async () => {
        await page.getByTestId('add-new-note').click();
        // await page.pause();

        await expect(page.getByText('Add new note')).toBeVisible(); 
        await page.getByTestId('note-category').selectOption(data.NoteCategory);
        await page.getByTestId('note-title').fill(data.NoteTitle);
        await page.getByTestId('note-description').fill(data.NoteDescription);
        await page.getByTestId('note-submit').click();

        await expect(page.locator("//div[text()='" + data.NoteTitle + "']")).toBeVisible();
        await page
        .locator(
            "//div[text()='" +data.NoteTitle +"']//following-sibling::div/div/button[normalize-space()='Delete']").click();
        await expect(page.getByTestId('logout')).toBeVisible();
    });
}

    test.afterAll(async () => {
        await page.getByTestId('logout').click();
        await expect(page).toHaveURL("https://practice.expandtesting.com/notes/app");
        await expect(page.getByRole('heading', { name: 'Welcome to Notes App' })).toBeVisible();
    });
});
