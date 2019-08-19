import React, { Fragment, useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';

const TodosQuery = gql`
  query {
    todoes {
      id
      text
    }
  }
`;

const CreateTodoMutation = gql`
  mutation CreateTodo($text: String!) {
    createTodo(
      data: {
        text: $text
      }
    ) {
      id
    }
  }
`;

const TodoList = props => {
  const { todos } = props;
  const [newTodo, setNewTodo] = useState('');

  const renderTodoList = () => (
    <ul>
      {
        todos.todoes.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))
      }
    </ul>
  );

  const addTodo = () => {
    if (newTodo) {
      props.createTodo({
        variables: { text: newTodo },
        update: () => {
          props.todos.refetch();
          setNewTodo('');
        }
      });
    }
  };

  return (
    <Fragment>
      {
        todos.loading
          ? <p>Carregando...</p>
          : renderTodoList()
      }

      <input
        type='text'
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Adicionar</button>
    </Fragment>
  );
};

export default compose(
  graphql(TodosQuery, { name: 'todos' }),
  graphql(CreateTodoMutation, { name: 'createTodo' })
)(TodoList);
