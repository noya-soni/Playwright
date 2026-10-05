
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

test('TC_01 - Delete booking with valid booking ID and valid token', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect(response.status()).toBe(201);
});

test('TC_02 - Delete booking and verify booking no longer exists', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const deleteResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect(deleteResponse.status()).toBe(201);

    const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);

    expect(getResponse.status()).toBe(404);
});

test('TC_03 - Delete booking with valid authentication token', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect(response.status()).toBe(201);
});

test('TC_04 - Delete booking without authentication token', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`);

    expect(response.status()).toBe(403);
});

test('TC_05 - Delete booking with invalid authentication token', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: 'token=invalid_token_123'
        }
    });

    expect(response.status()).toBe(403);
});

test('TC_06 - Delete booking with non-existing booking ID', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${BASE_URL}/booking/99999999`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(response.status());
});

test('TC_07 - Delete booking with booking ID 0', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${BASE_URL}/booking/0`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(response.status());
});

test('TC_08 - Delete booking with negative booking ID', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${BASE_URL}/booking/-1`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(response.status());
});

test('TC_09 - Delete booking with alphabetic booking ID', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${BASE_URL}/booking/abc`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(response.status());
});

test('TC_10 - Delete booking with special-character ID', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${BASE_URL}/booking/@#$`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(response.status());
});

test('TC_11 - Delete same booking twice', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const firstResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect(firstResponse.status()).toBe(201);

    const secondResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(secondResponse.status());
});

test('TC_12 - Delete booking with empty booking ID', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${BASE_URL}/booking/`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(response.status());
});

test('TC_13 - Delete booking with very large booking ID', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${BASE_URL}/booking/999999999999999`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect([404, 405]).toContain(response.status());
});

test('TC_14 - Delete booking with wrong Cookie format', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: 'invalidtoken'
        }
    });

    expect(response.status()).toBe(403);
});

test('TC_15 - Delete booking with invalid or expired token', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: 'token=expired_invalid_token'
        }
    });

    expect(response.status()).toBe(403);
});

test('TC_16 - Delete booking with empty request body', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        },
        data: {}
    });

    expect(response.status()).toBe(201);
});

test('TC_17 - Delete booking with valid ID and extra headers', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });

    expect(response.status()).toBe(201);
});

test('TC_18 - Delete one booking and verify another booking is unaffected', async ({ request }) => {
    const token = await getToken(request);

    const bookingId1 = await createBooking(request);
    const bookingId2 = await createBooking(request);

    const deleteResponse = await request.delete(`${BASE_URL}/booking/${bookingId1}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect(deleteResponse.status()).toBe(201);

    const secondBookingResponse = await request.get(`${BASE_URL}/booking/${bookingId2}`);

    expect(secondBookingResponse.status()).toBe(200);
});

test('TC_19 - Delete multiple different bookings sequentially', async ({ request }) => {
    const token = await getToken(request);

    const bookingId1 = await createBooking(request);
    const bookingId2 = await createBooking(request);
    const bookingId3 = await createBooking(request);

    const response1 = await request.delete(`${BASE_URL}/booking/${bookingId1}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    const response2 = await request.delete(`${BASE_URL}/booking/${bookingId2}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    const response3 = await request.delete(`${BASE_URL}/booking/${bookingId3}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect(response1.status()).toBe(201);
    expect(response2.status()).toBe(201);
    expect(response3.status()).toBe(201);
});

test('TC_20 - Delete booking and verify response', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.text();
    expect(responseBody).toBe('Created');
});
