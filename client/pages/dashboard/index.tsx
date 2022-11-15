import { useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';

import { GET_USER_BY_TOKEN, DELETE_USER } from '../../graphql/queries';

function Dashboard() {
  const { loading, error, data } = useQuery(GET_USER_BY_TOKEN);

  const [DeleteUserByEmail] = useMutation(DELETE_USER);
  const onDelete = async (email: string) => {
    localStorage.removeItem('token');
    await DeleteUserByEmail({
      variables: {
        email,
      },
    });
    window.location.reload();
  };

  if (loading) { return <span>loading...</span>; }

  const Container = styled.div`
  padding: 50px 0px;
  background: #5acee8;
`;

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
    font-size: 20px;
    margin-bottom: 15px;
  `;
  const FormLabel = styled.label`
    color: #8c96a3;
    font-size: 14px;
    font-weight: 700;
  `;

  const FormError = styled.button`
    font-size: 12px;
    margin-top: 5px;
  `;
  return (
    <Container>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <FormContainer className="container card pb-5 mb-5 w-25" id="dash-main">
        <div className="card-body">

          <div className="row">
            {data?.getUserByToken && (
            <div>
              <FormHeading id="dashboard-name" data-testid="dashboard-name">
                { `Welcome, ${data.getUserByToken.firstName}`}
              </FormHeading>
              <div className="row">
                <FormLabel className="text-justify font-monospace">{`First Name: ${data.getUserByToken.firstName}`}</FormLabel>
                <FormLabel className="text-justify font-monospace">{`Last Name: ${data.getUserByToken.lastName}`}</FormLabel>
                <FormLabel className="text-justify font-monospace">{`Email: ${data.getUserByToken.email}`}</FormLabel>
                <FormLabel className="text-justify font-monospace">{`Phone Number: ${data.getUserByToken.phoneNumber}`}</FormLabel>
              </div>
              <FormError
                type="button"
                id="delete-user"
                style={{ opacity: '0' }}
                className="row btn btn-sm btn-danger"
                name={data.getUserByToken.email}
                onClick={() => onDelete(data.getUserByToken.email)}
              >
                Delete User
              </FormError>
            </div>
            )}
          </div>
          {error && (
          <pre className="text-danger">
            Bad:
            {error?.graphQLErrors.map(({ message }, i) => (
              <span className="text-danger" id="dash-error" key={i}>
                {message}
              </span>
            ))}
          </pre>
          )}
        </div>
      </FormContainer>
    </Container>
  );
}

export default Dashboard;
