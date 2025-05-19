const { test, expect }= require('@playwright/test')
const notes = require('../TestData/validatelogin.json');
const baseUrl = 'https://restful-booker.herokuapp.com'

async function AccessToken(username, password, request) {
    console.log("Getting Access Token....")
    let token;
    const response =await request.post(`${baseUrl}/auth`, {
      data: {
          "username": username,
          "password": password
        },
      })

    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
    token = responseBody.token
    console.log(token)
    return token
}

async function Create_booking_id(token , request) {
  let bookingid
   const response = await request.post(`${baseUrl}/booking`, {
    headers: {
          'x-auth-token': `${token}`,
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
      expect(response.status()).toBe(200);
      bookingid = responseBody.bookingid;
      expect(bookingid).toBeTruthy();
      console.log(bookingid)
      return bookingid
    }

export{AccessToken}
export{Create_booking_id}