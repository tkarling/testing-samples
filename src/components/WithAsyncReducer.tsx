import React, { useReducer, useEffect, useCallback } from 'react'
import todosReducer, { ACTIONS } from '../reducers/todos'
import * as api from '../api/service'
import * as Widget from './Common'
import { TEST_ID } from './Common'

const TodoList = ({ todos, dispatch }: { todos: Todo[]; dispatch: any }) => (
  <div>
    <Widget.AddButton dispatch={dispatch} type={ACTIONS.startAdd} />
    {todos.map((todo: Todo) => (
      <div key={todo.id}>
        <Widget.CheckBox
          todo={todo}
          dispatch={dispatch}
          type={ACTIONS.startToggle}
        />
        {todo.title}
        <Widget.DeleteButton
          todo={todo}
          dispatch={dispatch}
          type={ACTIONS.startDelete}
        />
      </div>
    ))}
  </div>
)

const useAsyncTodos = () => {
  const [todos, dispatch] = useReducer(todosReducer as any, []) as any

  useEffect(() => {
    api.getTodos().then(aTodos => {
      dispatch({ type: ACTIONS.set, todos: aTodos })
    })
  }, [dispatch])

  const customDispatch = useCallback(
    async (action: any) => {
      switch (action.type) {
        case ACTIONS.startAdd: {
          const aTodos = await api.addTodo({ title: action.title })
          dispatch({ type: ACTIONS.set, todos: aTodos })
          break
        }
        case ACTIONS.startDelete: {
          const aTodos = await api.deleteTodo(action.todo)
          dispatch({ type: ACTIONS.set, todos: aTodos })
          break
        }
        case ACTIONS.startToggle: {
          const aTodos = await api.toggleTodo(action.todo)
          dispatch({ type: ACTIONS.set, todos: aTodos })
          break
        }
        default:
          // Not a special case, dispatch the action
          dispatch(action)
      }
    },
    [dispatch]
  )

  return [todos, customDispatch]
}

const WithAsyncReducer = () => {
  const [todos, dispatch] = useAsyncTodos()

  return (
    <div data-testid={TEST_ID.container}>
      <h4>With Async Reducer</h4>
      {!todos.length && <Widget.EmptyList />}
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  )
}

export default WithAsyncReducer
