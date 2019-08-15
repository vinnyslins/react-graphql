import React from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './services/apollo';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <TodoList/>
    </ApolloProvider>
  );
}

export default App;
