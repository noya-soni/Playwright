
import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com/booking';


test('TC_01 - Create booking with all valid details', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeTruthy();
    expect(body.booking.firstname).toBe('Jim');
    expect(body.booking.lastname).toBe('Brown');
    expect(body.booking.totalprice).toBe(111);
    expect(body.booking.depositpaid).toBe(true);
    expect(body.booking.bookingdates.checkin).toBe('2026-09-20');
    expect(body.booking.bookingdates.checkout).toBe('2026-09-25');
    expect(body.booking.additionalneeds).toBe('Breakfast');
});


test('TC_02 - Create booking with valid firstname and lastname', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'John',
            lastname: 'Smith',
            totalprice: 200,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeTruthy();
    expect(body.booking.firstname).toBe('John');
    expect(body.booking.lastname).toBe('Smith');
});

test('TC_03 - Create booking with valid totalprice', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Alex',
            lastname: 'Brown',
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.booking.totalprice).toBe(500);
});

test('TC_04 - Create booking with depositpaid true', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Alex',
            lastname: 'Brown',
            totalprice: 300,
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

test('TC_05 - Create booking with depositpaid false', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Alex',
            lastname: 'Brown',
            totalprice: 300,
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

test('TC_06 - Create booking with valid booking dates', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'David',
            lastname: 'Lee',
            totalprice: 250,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.booking.bookingdates.checkin).toBe('2026-09-20');
    expect(body.booking.bookingdates.checkout).toBe('2026-09-25');
});

test('TC_07 - Create booking with additional needs', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'David',
            lastname: 'Lee',
            totalprice: 250,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            },
            additionalneeds: 'Breakfast'
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.booking.additionalneeds).toBe('Breakfast');
});

test('TC_08 - Create booking without additional needs', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'David',
            lastname: 'Lee',
            totalprice: 250,
            depositpaid: true,
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

test('TC_09 - Create booking with different valid price', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'David',
            lastname: 'Lee',
            totalprice: 999,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.booking.totalprice).toBe(999);
});

test('TC_10 - Verify booking ID after booking creation', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'David',
            lastname: 'Lee',
            totalprice: 300,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeTruthy();
    expect(typeof body.bookingid).toBe('number');
});

test('TC_11 - Create booking with missing firstname', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_12 - Create booking with missing lastname', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_13 - Create booking with missing totalprice', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_14 - Create booking with missing depositpaid', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_15 - Create booking with missing bookingdates', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_16 - Create booking with missing check-in date', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_17 - Create booking with missing check-out date', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-09-20'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_18 - Create booking with invalid date format', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '20-09-2026',
                checkout: '25-09-2026'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_19 - Create booking with invalid data types', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 'invalid',
            depositpaid: 'true',
            bookingdates: {
                checkin: '2026-09-20',
                checkout: '2026-09-25'
            }
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

test('TC_20 - Create booking with empty request body', async ({ request }) => {

    const response = await request.post(baseURL, {
        data: {}
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toBeTruthy();
});

