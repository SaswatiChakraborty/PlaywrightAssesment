import { test, expect } from '@playwright/test'
import { AccessToken, Create_booking_id} from './BaseClass'

test.describe('Delete booking', () => {
  const baseUrl = 'https://restful-booker.herokuapp.com'
  var token
  var bookingid
 
  test.beforeAll(async ({ request }) => {
    token = await AccessToken("admin", "password123", request)
    expect(token).toBeTruthy();
    console.log(token);
    bookingid = await Create_booking_id(token,request);
    expect(bookingid).toBeTruthy();
    console.log('Booking ID:', bookingid);
  })

    test('Delete Request - Delete Notes', async ({ request }) => {
      const response = await request.delete(`${baseUrl}/booking/${bookingid}`, {
  
          headers: {
            'Cookie': `token=${token}`,
            'accept':'application/json',
            'Content-Type':'application/json'
          },
      })
      expect(response.status()).toBe(201)
      })

})
