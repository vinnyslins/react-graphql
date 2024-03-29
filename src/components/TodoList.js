import React, { Fragment, useState } from 'react';
import { useMutation, useQuery, useSubscription } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TODOS = gql`
  query {
    todoes {
      id
      text
    }
  }
`;

const CREATE_TODO = gql`
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

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`;

const TODOS_SUBSCRIPTION = gql`
subscription {
  todo {
      mutation
    }
  }
`;

const Error = () => (
  <p>Ocorreu um erro!</p>
);

const Loading = () => (
  <p>Carregando...</p>
)

const TodoList = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  useSubscription(TODOS_SUBSCRIPTION, {
    onSubscriptionData: () => refetch()
  });

  const [newTodo, setNewTodo] = useState('');

  const renderTodoList = () => (
    <ul>
      {
        data.todoes.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={
              () => deleteTodo({ variables: { id: todo.id } })
            }>Excluir</button>
          </li>
        ))
      }
    </ul>
  );

  const addTodo = () => {
    if (newTodo) {
      createTodo({
        variables: { text: newTodo },
        update: () => {
          setNewTodo('');
        }
      });
    }
  };

  if (error) return <Error/>
  if (loading) return <Loading/>

  return (
    <Fragment>
      {renderTodoList()}

      <input
        type='text'
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Adicionar</button>
    </Fragment>
  );
};

export default TodoList;
