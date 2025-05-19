const { test, expect } = require('@playwright/test')
import { AccessToken} from './BaseClass'


test.describe('Create booking', () => {
  const baseUrl = 'https://restful-booker.herokuapp.com'
  var token
  var bookingid

  test.beforeAll(async ({ request }) => {
    token = await AccessToken("admin", "password123", request)
    expect(token).toBeTruthy();
    console.log(token);
  })

  test('Create Booking', async ({ request }) => {
      const response = await request.post(`${baseUrl}/booking`, {
        headers: {
          'Cookie': `token=${token}`,
          'accept':'application/json',
          'Content-Type':'application/json'
        },
        data: {
        firstname: 'Alice',
        lastname: 'Wonder',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-06-01',
          checkout: '2024-06-10'
        },
        additionalneeds: 'Breakfast'
      },
      })

      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)

      expect(response.status()).toBe(200);
      bookingid = responseBody.booking.firstname;
      expect(bookingid).toBeTruthy();
      console.log('Booking ID:', bookingid);
    })
})