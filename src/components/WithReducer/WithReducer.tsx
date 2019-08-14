import React, { useReducer } from 'react'
import todosReducer, { ACTIONS } from '../../reducers/todos'
import * as Widget from './Common'
import { TEST_ID } from './Common'

const TodoList = ({ todos, dispatch }: { todos: Todo[]; dispatch: any }) => (
  <div>
    <Widget.AddButton dispatch={dispatch} type={ACTIONS.add} />
    {todos.map((todo: Todo) => (
      <div key={todo.id}>
        <Widget.CheckBox
          todo={todo}
          dispatch={dispatch}
          type={ACTIONS.toggle}
        />
        {todo.title}
        <Widget.DeleteButton
          todo={todo}
          dispatch={dispatch}
          type={ACTIONS.delete}
        />
      </div>
    ))}
  </div>
)

const WithReducer = () => {
  const [todos, dispatch] = useReducer(todosReducer as any, []) as any

  return (
    <div data-testid={TEST_ID.container}>
      <h4>With Reducer</h4>
      {!todos.length && <Widget.EmptyList />}
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  )
}

export default WithReducer
