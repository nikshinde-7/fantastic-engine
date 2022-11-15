import '@testing-library/jest-dom';
import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import SignUpForm from '../pages/signUp';

describe('Signup', () => {
  it('should be rendering', () => {
    const { getByPlaceholderText, get } = render(<SignUpForm />);

    const firstNameField = getByPlaceholderText('First Name');
    const lastNameField = getByPlaceholderText('Last Name');
    const emailField = getByPlaceholderText('email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Sign Up');

    // const buttonElement = getAllByText('signUpSubmit');

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

    // fireEvent.change(firstNameField, { target: { value: 'John Doe' } });
    // fireEvent.change(emailField, { target: { value: 'a@a.co' } });
    // fireEvent.change(passwordField, { target: { value: '123456' } });
  });
});
