const { test, expect } = require('@playwright/test')
import { AccessToken, Create_booking_id} from './BaseClass'


test.describe('Update booking', () => {
  const baseUrl = 'https://restful-booker.herokuapp.com'
  var token
  var bookingid
  let firstname = 'Bob'
  let lastname = 'Builder'
  var respfirstname
  var resplastname

  test.beforeAll(async ({ request }) => {
    token = await AccessToken("admin", "password123", request)
    expect(token).toBeTruthy();
    console.log(token);
    bookingid = await Create_booking_id(token,request)
    expect(bookingid).toBeTruthy();
    console.log('Booking ID:', bookingid);
  })

  test('Update Booking', async ({ request }) => {
      const response = await request.put(`${baseUrl}/booking/${bookingid}`, {
        headers: {
          'Cookie': `token=${token}`,
          'accept':'application/json',
          'Content-Type':'application/json'
        },
        data: {
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-06-01',
          checkout: '2024-06-10'
        },
        additionalneeds: 'Breakfast'
      },
      })

      expect(response.status()).toBe(200);

      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)
      
      respfirstname = responseBody.firstname;
      resplastname = responseBody.lastname;
      expect(firstname).toBe(respfirstname);
      expect(lastname).toBe(resplastname);
    })
})