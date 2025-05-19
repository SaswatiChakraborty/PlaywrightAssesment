const { test, expect } = require('@playwright/test')

const notes = require('../TestData/validatelogin.json');

test.describe('Fetch token from API', () => {
  const baseUrl = 'https://restful-booker.herokuapp.com'
  let token

  notes.forEach((note, index) => {
    test(`POST Request`, async ({ request }) => {
      const response = await request.post(`${baseUrl}/auth`, {
        data: {
          "username": note.username,
          "password": note.password
        },
      })

      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)

      expect(response.status()).toBe(200)
      expect(responseBody.token).toBeTruthy()
      token = responseBody.token
      console.log(token)
    })
  })
})