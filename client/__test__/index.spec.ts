/* eslint-disable no-undef */
import puppeteer from 'puppeteer'; // 1

import { apiUrl, testUser } from './config';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

// 2
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

test('test env = test', () => {
  expect(process.env.NODE_ENV).toBe('test');
});

test('visit signup page', async () => {
  await page.waitForSelector('#nav');
  await page.waitForSelector('#signUp-form');
});

test('test validations', async () => {
  await page.type('#email', testUser.firstName);

  await page.type('#password', testUser.password);

  await page.waitForSelector('#errors-email');

  const emailValError = await page.$eval('#errors-email', (e) => e.innerHTML);

  expect(emailValError).toBe('Invalid email');

  await page.type('#email', testUser.email);

  await page.type('#confirmPassword', '12');

  await page.focus('#firstName');

  const cnfPassValError = await page.$eval(
    '#errors-confirmPassword',
    (e) => e.innerHTML,
  );

  expect(cnfPassValError).toBe('Passwords must match');

  await page.type('#confirmPassword', '34');

  await page.focus('#lastName');

  const fNameValError = await page.$eval(
    '#errors-firstName',
    (e) => e.innerHTML,
  );

  expect(fNameValError).toBe('Required');

  await page.type('#firstName', testUser.firstName);

  await page.focus('#phoneNumber');

  const lNameValError = await page.$eval(
    '#errors-lastName',
    (e) => e.innerHTML,
  );

  expect(lNameValError).toBe('Required');

  await page.type('#lastName', testUser.lastName);

  await page.focus('#accepted');

  const phoneValError = await page.$eval(
    '#errors-phoneNumber',
    (e) => e.innerHTML,
  );

  expect(phoneValError).toBe('A phone number is required');

  await page.type('#phoneNumber', testUser.phoneNumber);

  await page.focus('#email');

  const checkBosError = await page.$eval(
    '#errors-accepted',
    (e) => e.innerHTML,
  );

  expect(checkBosError).toBe('You must accept the terms and conditions');

  await page.focus('#accepted');

  await page.keyboard.press('Space');
});

test('form submit', async () => {
  expect(process.env.NODE_ENV).toBe('test');
  jest.setTimeout(30000);
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  await page.waitForSelector('#dash-main');

  const welcomeField = await page.$eval(
    '#dashboard-name',
    (e) => e.innerHTML,
  );

  expect(welcomeField).toBe(`Welcome, ${testUser.firstName}`);
});

test('delete created user', async () => {
  expect(process.env.NODE_ENV).toBe('test');

  await page.waitForSelector('#delete-user');
  await page.click('#delete-user');
  // await page.focus('#delete-user');
  // await page.keyboard.press('Enter');
  await page.waitForNavigation();
});

// 4
afterAll(() => {
  browser.close();
});
