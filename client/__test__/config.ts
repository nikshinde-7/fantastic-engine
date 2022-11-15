const testUser = {
  firstName: 'test',
  lastName: 'test',
  email: '@fa_eng.com',
  password: '1234',
  confirmPassword: '1234',
  phoneNumber: '1234567890',
};

const jestTestUser = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@fa_eng.com',
  password: 'test',
  confirmPassword: 'test',
  phoneNumber: '1234567890',
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export { testUser, apiUrl, jestTestUser };
