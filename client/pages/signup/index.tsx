import { useMutation } from '@apollo/client';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useState } from 'react';
import { ADD_USER } from '../../graphql/queries';
import WithApollo from '../../lib/WithApollo';
// import styles from './signup-form.module.css';

import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/state';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
  phoneNumber: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
  accept: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions',
  ),
});

interface Values {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}
function SignUpForm(): JSX.Element {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  if (user) {
    router.push('/dashboard');
  }
  const [AddUser] = useMutation(ADD_USER);
  const [error, setError] = useState('');

  const signUp = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    try {
      await localStorage.removeItem('token');
      const { data } = await AddUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        },
      });

      if (data) {
        localStorage.setItem('token', data.createUser.token);
        window.location.href = '/dashboard';
      }
      console.log('data :>> ', data);
      setSubmitting(false);
    } catch (error: any) {
      setError(error.message);

      console.log('here', error);
      setSubmitting(false);
    }
  };

  const FormContainer = styled.div`
    z-index: 1;
    position: relative;
    border-radius: 15px;
    background: white;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.15);
    padding: 30px;
    margin: auto;
    max-width: 100%;
    width: 540px;
  `;

  const FormHeading = styled.h1`
    font-family: 'zenon', 'serif';
    color: #5acee8;
    font-weight: 500;
    font-size: 36px;
    margin-bottom: 15px;
  `;

  const FormInput = styled.div`
    width: 100%;
    padding: 7px 12px;
    font-size: 16px;
    border-radius: 10px;
    border: 2px solid #d7dae0;
    color: #707070 !important;
    -webkit-text-fill-color: #707070 !important;
    background: white;
    padding-right: 42px;
  `;

  const FormSubmit = styled.button`
    white-space: nowrap;
    box-sizing: border-box !important;
    border-radius: 15px;
    height: 40px;
    line-height: unset;
    padding: 0px 24px;
    box-shadow: none;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: white;
    background-color: #ffcc01;
    border: none;
    border-color: white;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0;
    cursor: pointer;
    position: relative;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  `;

  const Container = styled.div`
    padding: 50px 0px;
    background: #5acee8;
  `;

  const FormError = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 10px;
  `;

  return (
    <Container>
      <FormContainer>
        <FormHeading>Sign Up</FormHeading>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            accept: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={signUp}
        >
          {({ values, errors, touched }) => (
            <Form>
              <FormInput>
                <Field
                  id="email"
                  name="email"
                  placeholder="email"
                  aria-describedby="emailHelp"
                />
              </FormInput>
              {errors.email && touched.email ? (
                <FormError>{errors.email}</FormError>
              ) : null}
              <FormInput>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </FormInput>
              {errors.password && touched.password ? (
                <FormError>{errors.password}</FormError>
              ) : null}
              <FormInput>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  type="confirmPassword"
                />
              </FormInput>
              {errors.confirmPassword && touched.confirmPassword ? (
                <FormError>{errors.confirmPassword}</FormError>
              ) : null}
              <FormInput>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                />
              </FormInput>
              {errors.firstName && touched.firstName ? (
                <FormError>{errors.firstName}</FormError>
              ) : null}
              <FormInput>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                />
              </FormInput>
              {errors.lastName && touched.lastName ? (
                <FormError>{errors.lastName}</FormError>
              ) : null}
              <FormInput>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  type="text"
                />
              </FormInput>
              {errors.phoneNumber && touched.phoneNumber ? (
                <FormError>{errors.phoneNumber}</FormError>
              ) : null}
              <label>
                <Field type="checkbox" name="accept" />
                Accepted terms & conditions
              </label>
              {errors.accept && touched.accept ? (
                <FormError>{errors.accept}</FormError>
              ) : null}
              <FormSubmit id="signUpSubmit">Sign Up</FormSubmit>
            </Form>
          )}
        </Formik>
        {error && <FormError className="text-danger">{error}</FormError>}
      </FormContainer>
    </Container>
  );
}

export { SignUpForm };

export default WithApollo(SignUpForm);
