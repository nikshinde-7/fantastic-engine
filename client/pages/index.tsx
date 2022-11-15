import type { NextPage } from 'next';

import WithApollo from '../lib/WithApollo';

const Home: NextPage = () => {
  return <div>HOME PAGE</div>;
};

export default WithApollo(Home);
