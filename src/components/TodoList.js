import React, { Fragment } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const TodosQuery = gql`
  query {
    todoes {
      id
      text
    }
  }
`;

const TodoList = props => {
  const { todos } = props;

  const renderTodoList = () => (
    <ul>
      {
        todos.todoes.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))
      }
    </ul>
  );

  return (
    <Fragment>
      {
        todos.loading
          ? <p>Carregando...</p>
          : renderTodoList()
      }
    </Fragment>
  );
};

export default graphql(TodosQuery, { name: 'todos' })(TodoList);
