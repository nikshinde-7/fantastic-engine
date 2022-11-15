import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import WithApollo from '../../lib/WithApollo';

import { useQuery } from '@apollo/client';

import { GET_USER_BY_TOKEN } from '../../graphql/queries';
import { useAuth } from '../../context/state';

function Dashboard() {
  // const router = useRouter();

  // const { user, login, logout } = useAuth();
  // if (!user) {
  //   router.push('/login');
  // }
  const { loading, error, data } = useQuery(GET_USER_BY_TOKEN);
  if (loading) return <span>loading...</span>;
  return (
    <div>
      <h2>
        {data?.getUserByToken && (
          <div>{`Logged in User: ${data.getUserByToken.firstName} ${data.getUserByToken.lastName}`}</div>
        )}
      </h2>
      {error && (
        <pre>
          Bad:
          {error?.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      )}
    </div>
  );
}

export default WithApollo(Dashboard);
