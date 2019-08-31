import React, { useReducer } from 'react'
import todosReducer, { ACTION } from './reducers/todos'
import * as Widget from './Common'
import { TEST_ID } from './Common'

const TodoList = ({ todos, dispatch }: { todos: Todo[]; dispatch: any }) => (
  <Widget.TodoList>
    <Widget.Row>
      <Widget.AddButton dispatch={dispatch} type={ACTION.add} />
    </Widget.Row>
    {!todos.length && <Widget.EmptyList />}
    {todos.map((todo: Todo) => (
      <Widget.Row key={todo.id}>
        <Widget.Todo>
          <Widget.CheckBox
            todo={todo}
            dispatch={dispatch}
            type={ACTION.toggle}
          />
          <Widget.Title>{todo.title}</Widget.Title>
          <Widget.DeleteButton
            todo={todo}
            dispatch={dispatch}
            type={ACTION.delete}
          />
        </Widget.Todo>
      </Widget.Row>
    ))}
  </Widget.TodoList>
)

const WithReducer = () => {
  const [todos, dispatch] = useReducer(todosReducer as any, []) as any
  return (
    <div data-testid={TEST_ID.container}>
      <h4>With Reducer</h4>
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  )
}

export default WithReducer
