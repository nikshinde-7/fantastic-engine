import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import WithApollo from '../../lib/WithApollo';

import { useMutation, useQuery } from '@apollo/client';

import { GET_USER_BY_TOKEN, DELETE_USER } from '../../graphql/queries';
import { useAuth } from '../../context/state';

function Dashboard() {
  const router = useRouter();

  // const { user, login, logout } = useAuth();
  // if (!user) {
  //   router.push('/login');
  // }
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

  if (loading) return <span>loading...</span>;
  return (
    <div id={'dash-main'}>
      <h2>
        {data?.getUserByToken && (
          <div>
            <div>{`Logged in User: ${data.getUserByToken.firstName} ${data.getUserByToken.lastName}`}</div>
            <button
              id={'delete-user'}
              className="btn btn-sm btn-danger"
              name={data.getUserByToken.email}
              onClick={() => onDelete(data.getUserByToken.email)}
            >
              Delete User
            </button>
          </div>
        )}
      </h2>
      {error && (
        <pre>
          Bad:
          {error?.graphQLErrors.map(({ message }, i) => (
            <span id={'dash-error'} key={i}>
              {message}
            </span>
          ))}
        </pre>
      )}
    </div>
  );
}

export default WithApollo(Dashboard);
