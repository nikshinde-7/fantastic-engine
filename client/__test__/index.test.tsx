/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';

import SignUpForm from '../pages/index';
import { jestTestUser } from './config';

describe('Signup', () => {
  it('should be rendering', () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const firstNameField = getByPlaceholderText('First Name');
    const lastNameField = getByPlaceholderText('Last Name');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const acceptField = getByTestId('accepted');
    const buttonElement = getByTestId('signUpSubmit');

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(acceptField).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('should have validation error email field is touched and error exists on form', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const input = getByPlaceholderText('Email');

    // Call blur without inputting anything which should trigger a validation error
    await waitFor(() => {
      fireEvent.blur(input);
    });

    const validationErrors = getByTestId('errors-email');

    expect(validationErrors.innerHTML).toBe('Required');
  });

  test('should have validation error firstName field is touched and error exists on form', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const input = getByPlaceholderText('First Name');

    // Call blur without inputting anything which should trigger a validation error
    await waitFor(() => {
      fireEvent.blur(input);
    });

    const validationErrors = getByTestId('errors-firstName');

    expect(validationErrors.innerHTML).toBe('Required');
  });

  test('should have validation error lastName field is touched and error exists on form', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const input = getByPlaceholderText('Last Name');

    // Call blur without inputting anything which should trigger a validation error
    await waitFor(() => {
      fireEvent.blur(input);
    });

    const validationErrors = getByTestId('errors-lastName');

    expect(validationErrors.innerHTML).toBe('Required');
  });

  test('should have validation error password field is touched and error exists on form', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const input = getByPlaceholderText('Password');

    // Call blur without inputting anything which should trigger a validation error
    await waitFor(() => {
      fireEvent.blur(input);
    });

    const validationErrors = getByTestId('errors-password');

    expect(validationErrors.innerHTML).toBe('Required');
  });

  test('should have validation error phoneNumber field is touched and error exists on form', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const input = getByPlaceholderText('Phone Number');

    // Call blur without inputting anything which should trigger a validation error
    await waitFor(() => {
      fireEvent.blur(input);
    });

    const validationErrors = getByTestId('errors-phoneNumber');

    expect(validationErrors.innerHTML).toBe('A phone number is required');
  });

  test('should have validation error confirmPassword field is touched and error exists on form', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const passwordField = getByPlaceholderText('Password');

    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    // Call blur without inputting anything which should trigger a validation error
    await waitFor(() => {
      fireEvent.change(passwordField, { target: { value: 'test' } });
    });

    await waitFor(() => {
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'wrongPassword' },
      });
    });
    await waitFor(() => {
      fireEvent.blur(confirmPasswordInput);
    });

    const validationErrors = getByTestId('errors-confirmPassword');

    expect(validationErrors.innerHTML).toBe('Passwords must match');
  });
  it('should be able to set values', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm />);

    const firstNameField = getByPlaceholderText('First Name');
    const lastNameField = getByPlaceholderText('Last Name');
    const phoneNumberField = getByPlaceholderText('Phone Number');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const acceptField = getByTestId('accepted');

    await waitFor(() => {
      fireEvent.change(acceptField, { target: { value: true } });
    });

    await waitFor(() => {
      fireEvent.change(firstNameField, {
        target: { value: jestTestUser.firstName },
      });
    });
    await waitFor(() => {
      fireEvent.change(lastNameField, {
        target: { value: jestTestUser.lastName },
      });
    });

    await waitFor(() => {
      fireEvent.change(emailField, { target: { value: jestTestUser.email } });
    });

    await waitFor(() => {
      fireEvent.change(passwordField, {
        target: { value: jestTestUser.password },
      });
    });

    await waitFor(() => {
      fireEvent.change(phoneNumberField, {
        target: { value: jestTestUser.phoneNumber },
      });
    });
  });
});
