
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

async function getToken(request) {
    const response = await request.post(`${BASE_URL}/auth`, {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token).toBeTruthy();

    return body.token;
}

async function createBooking(request) {
    const response = await request.post(`${BASE_URL}/booking`, {
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

    return body.bookingid;
}

function validBooking() {
    return {
        firstname: 'James',
        lastname: 'Brown',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-09-25',
            checkout: '2026-09-30'
        },
        additionalneeds: 'Breakfast'
    };
}

test('TC_01 - Update booking with all valid details', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data: validBooking()
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe('James');
    expect(body.lastname).toBe('Brown');
    expect(body.totalprice).toBe(150);
    expect(body.depositpaid).toBe(true);
    expect(body.bookingdates.checkin).toBe('2026-09-25');
    expect(body.bookingdates.checkout).toBe('2026-09-30');
    expect(body.additionalneeds).toBe('Breakfast');
});

test('TC_02 - Update firstname', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.firstname = 'John';

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe('John');
});

test('TC_03 - Update lastname', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.lastname = 'Smith';

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.lastname).toBe('Smith');
});

test('TC_04 - Update totalprice', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.totalprice = 500;

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.totalprice).toBe(500);
});

test('TC_05 - Update depositpaid to true', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.depositpaid = true;

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.depositpaid).toBe(true);
});

test('TC_06 - Update depositpaid to false', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.depositpaid = false;

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.depositpaid).toBe(false);
});

test('TC_07 - Update check-in date', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.bookingdates.checkin = '2026-10-01';

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookingdates.checkin).toBe('2026-10-01');
});

test('TC_08 - Update check-out date', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.bookingdates.checkout = '2026-10-10';

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookingdates.checkout).toBe('2026-10-10');
});

test('TC_09 - Update additional needs', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.additionalneeds = 'Lunch';

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.additionalneeds).toBe('Lunch');
});

test('TC_10 - Update multiple booking fields', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = {
        firstname: 'Robert',
        lastname: 'Taylor',
        totalprice: 750,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-10-10',
            checkout: '2026-10-15'
        },
        additionalneeds: 'Dinner'
    };

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe('Robert');
    expect(body.lastname).toBe('Taylor');
    expect(body.totalprice).toBe(750);
    expect(body.depositpaid).toBe(false);
    expect(body.bookingdates.checkin).toBe('2026-10-10');
    expect(body.bookingdates.checkout).toBe('2026-10-15');
    expect(body.additionalneeds).toBe('Dinner');
});

test('TC_11 - Update booking with missing firstname', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    delete data.firstname;

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);
});

test('TC_12 - Update booking with missing lastname', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    delete data.lastname;

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);
});

test('TC_13 - Update booking with missing totalprice', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    delete data.totalprice;

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);
});

test('TC_14 - Update booking with missing bookingdates', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    delete data.bookingdates;

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.status()).toBe(200);
});

test('TC_15 - Update booking with invalid booking ID', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.put(`${BASE_URL}/booking/99999999`, {
        headers: { Cookie: `token=${token}` },
        data: validBooking()
    });

    expect(response.status()).toBe(404);
});

test('TC_16 - Update booking without authentication', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        data: validBooking()
    });

    expect(response.status()).toBe(403);
});

test('TC_17 - Update booking with invalid authentication token', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: 'token=invalid_token_123'
        },
        data: validBooking()
    });

    expect(response.status()).toBe(403);
});

test('TC_18 - Update booking with invalid data types', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const data = validBooking();
    data.totalprice = 'invalid';
    data.depositpaid = 'true';

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
        data
    });

    expect(response.ok()).toBeTruthy();
});

test('TC_19 - Update booking with invalid date format', async ({ request }) => {

     const token = await getToken(request); 

     const bookingId = await createBooking(request); 

     const data = validBooking(); 
     data.bookingdates.checkin = '25-09-2026';
     data.bookingdates.checkout = '30-09-2026'; 
     
     const response = await request.put(`${BASE_URL}/booking/${bookingId}`, { 
        headers: { Cookie: `token=${token}` }, 
        data 
    }); 
    
    expect(response.ok()).toBeTruthy(); }); 
    
    test('TC_20 - Update booking with empty request body', async ({ request }) => {
         const token = await getToken(request); 
         
         const bookingId = await createBooking(request); 
         
         const response = await request.put(`${BASE_URL}/booking/${bookingId}`, { 
            headers: { Cookie: `token=${token}` },
             data: {} 
            }); 
            
            expect(response.ok()).toBeTruthy(); 
        });
