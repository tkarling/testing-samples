import React from 'react'
import { ACTION, useAsyncTodos1 as useAsyncTodos } from './hooks/useAsyncTodos'
import * as Widget from './Common'
import { TEST_ID } from './Common'

const TodoList = ({ todos, dispatch }: { todos: Todo[]; dispatch: any }) => (
  <Widget.TodoList>
    <Widget.Row>
      <Widget.AddButton dispatch={dispatch} type={ACTION.startAdd} />
    </Widget.Row>
    {!todos.length && <Widget.EmptyList />}
    {todos.map((todo: Todo) => (
      <Widget.Row key={todo.id}>
        <Widget.Todo>
          <Widget.CheckBox
            todo={todo}
            dispatch={dispatch}
            type={ACTION.startToggle}
          />
          <Widget.Title>{todo.title}</Widget.Title>
          <Widget.DeleteButton
            todo={todo}
            dispatch={dispatch}
            type={ACTION.startDelete}
          />
        </Widget.Todo>
      </Widget.Row>
    ))}
  </Widget.TodoList>
)

const WithAsyncReducer = () => {
  const { todos, isLoading, dispatch } = useAsyncTodos()

  return (
    <div data-testid={TEST_ID.container}>
      <h4>With Async Reducer</h4>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <TodoList todos={todos} dispatch={dispatch} />}
    </div>
  )
}

export default WithAsyncReducer
