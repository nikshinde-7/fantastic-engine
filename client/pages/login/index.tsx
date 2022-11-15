import { useMutation } from '@apollo/client';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { LOGIN_USER } from '../../graphql/queries';
import WithApollo from '../../lib/WithApollo';
// import styles from './login-form.module.css';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/state';

interface Values {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
const styles = { login_box: '' };
function LoginForm() {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  if (user) {
    router.push('/dashboard');
  }
  const [LoginUser] = useMutation(LOGIN_USER);
  const [error, setError] = useState('');
  const onLogin = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    try {
      await localStorage.removeItem('token');
      const { data } = await LoginUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      if (data) {
        localStorage.setItem('token', data.login.token);
        login();
      }
      setSubmitting(false);
    } catch (error: any) {
      setError(error.message);

      console.log('here', error);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.login_box + ' p-3'}>
      <h1 className="display-6 mb-3">Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={onLogin}
      >
        <Form>
          <div className="mb-3">
            <Field
              className="form-control"
              id="email"
              name="email"
              placeholder="email"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default WithApollo(LoginForm);
