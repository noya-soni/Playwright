const { test, expect } = require('@playwright/test');

const baseURL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker - Booking API Tests', () => {

  // TC_01 - Create booking with all valid details
  test('TC_01 - Create booking with valid details', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Noya',
        lastname: 'Soni',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.bookingid).toBeTruthy();
    expect(responseBody.booking.firstname).toBe('Noya');
    expect(responseBody.booking.lastname).toBe('Soni');
  });


  // TC_02 - Create booking with valid data
  test('TC_02 - Create booking with minimum valid data', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 1000,
        depositpaid: false,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeTruthy();
  });


  // TC_03 - Valid booking dates
  test('TC_03 - Create booking with valid booking dates', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 1200,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    expect(response.status()).toBe(200);
  });


  // TC_04 - depositpaid true
  test('TC_04 - Create booking with depositpaid true', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.booking.depositpaid).toBe(true);
  });


  // TC_05 - depositpaid false
  test('TC_05 - Create booking with depositpaid false', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 1500,
        depositpaid: false,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.booking.depositpaid).toBe(false);
  });


  // TC_06 - Missing firstname
  test('TC_06 - Create booking without firstname', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        lastname: 'Soni',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    console.log('TC_06 Status:', response.status());
    console.log('TC_06 Response:', await response.text());

    expect(response.status()).toBe(200);
  });


  // TC_07 - Missing lastname
  test('TC_07 - Create booking without lastname', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Noya',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    console.log('TC_07 Status:', response.status());
    console.log('TC_07 Response:', await response.text());

    expect(response.status()).toBe(200);
  });


  // TC_08 - Invalid booking dates
  test('TC_08 - Create booking with invalid dates', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Noya',
        lastname: 'Soni',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-25',
          checkout: '2026-09-20'
        }
      }
    });

    console.log('TC_08 Status:', response.status());
    console.log('TC_08 Response:', await response.text());

    expect(response.status()).toBe(200);
  });


  // TC_09 - Invalid totalprice
  test('TC_09 - Create booking with invalid totalprice', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Noya',
        lastname: 'Soni',
        totalprice: 'abc',
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    console.log('TC_09 Status:', response.status());
    console.log('TC_09 Response:', await response.text());

    expect(response.status()).toBe(200);
  });


  // TC_10 - Invalid depositpaid
  test('TC_10 - Create booking with invalid depositpaid', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Noya',
        lastname: 'Soni',
        totalprice: 1500,
        depositpaid: 'yes',
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-25'
        }
      }
    });

    console.log('TC_10 Status:', response.status());
    console.log('TC_10 Response:', await response.text());

    expect(response.status()).toBe(200);
  });

});