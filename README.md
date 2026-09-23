# Playwright Automation Testing

## Project Overview

This project contains UI and API automation test cases developed using Playwright with JavaScript.

## Tools & Technologies

- Playwright
- JavaScript
- Node.js
- VS Code
- REST API
- Postman
- Swagger

## UI Automation

UI automation test cases are created for the OrangeHRM application.

**Application:**  
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

### UI Test Cases

This project contains 20 login test cases covering:

- Valid login
- Invalid login
- Blank username and password
- Invalid username/password
- Username and password validation
- Authentication validation
- Smoke testing
- Regression testing

## API Automation

API automation is performed using the Restful Booker API.

**API Endpoint:**  
https://restful-booker.herokuapp.com/booking

**API Test File:**  
`APITesting/Booking_API.spec.js`

### API Test Scenarios

- Create booking with valid details
- Create booking with minimum valid data
- Validate booking dates
- Validate depositpaid as true
- Validate depositpaid as false
- Create booking without firstname
- Create booking without lastname
- Validate invalid booking dates
- Validate invalid totalprice
- Validate invalid depositpaid value

## Test Evidence

Playwright is configured to capture:

- Screenshot on test failure
- Video on test failure
- Trace on test failure

## Test Report

Playwright HTML reports are used to view test execution results.

## Project Structure

```text
playwright/
│
├── APITesting/
│   └── Booking_API.spec.js
│
├── login.spec.js
├── TC_01.spec.js
├── TC_02.spec.js
├── ...
├── TC_020.spec.js
├── playwright.config.js
└── README.md