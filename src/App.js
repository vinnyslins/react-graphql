import React from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './services/apollo';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <div>Hello world</div>
    </ApolloProvider>
  );
}

export default App;
