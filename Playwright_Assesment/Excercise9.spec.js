import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/cart');

  await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible();
  await page.click('a[href="/computers"]');
  await page.click('a[href="/notebooks"]');
  await page.waitForSelector('.product-item');

  await page.waitForSelector('a:has-text("14.1-inch Laptop")');
  const laptopInfo = await page.locator('a:has-text("14.1-inch Laptop")').first();
  const text = await laptopInfo.textContent();
  console.log(text.trim());

  const laptopValue = await page.getByText('1590.00').textContent();
  console.log(laptopValue.trim())

  await page.click('.product-item:first-child input[value="Add to cart"]');
  await page.waitForSelector('.bar-notification.success', { timeout: 5000 });
  console.log('Notebook added to cart.');

  await page.click('a[href="/cart"]');


  await expect(page.locator('body')).toContainText(text.trim());
  const cartQuantityText = await page.locator('span.cart-qty').textContent(); // e.g. "(1)"
  const quantity = cartQuantityText.replace(/[()]/g, '').trim(); // Extract numeric part

  console.log('Cart Quantity after adding product:', quantity);

   await page.waitForSelector('input[name^="removefromcart"]');
   await page.check('input[name^="removefromcart"]');
   await page.click('input[name="updatecart"]');
   await page.waitForSelector('.order-summary-content', { timeout: 5000 });
  const cartText = await page.textContent('.order-summary-content');
  if (cartText.includes('Your Shopping Cart is empty!')) {
    console.log('Notebook successfully removed from cart.');
  } else {
    console.log('Item may not have been removed.');
  }
});
