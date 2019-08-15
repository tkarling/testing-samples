import React, { useReducer, useEffect, useCallback, useState } from 'react'
import todosReducer, { ACTIONS } from '../../reducers/todos'
import * as api from '../../api/service'
import * as Widget from './Common'
import { TEST_ID } from './Common'

const TodoList = ({ todos, dispatch }: { todos: Todo[]; dispatch: any }) => (
  <Widget.TodoList>
    <Widget.Row>
      <Widget.AddButton dispatch={dispatch} type={ACTIONS.startAdd} />
    </Widget.Row>
    {!todos.length && <Widget.EmptyList />}
    {todos.map((todo: Todo) => (
      <Widget.Row key={todo.id}>
        <Widget.Todo>
          <Widget.CheckBox
            todo={todo}
            dispatch={dispatch}
            type={ACTIONS.startToggle}
          />
          <Widget.Title>{todo.title}</Widget.Title>
          <Widget.DeleteButton
            todo={todo}
            dispatch={dispatch}
            type={ACTIONS.startDelete}
          />
        </Widget.Todo>
      </Widget.Row>
    ))}
  </Widget.TodoList>
)

const useAsyncTodos = () => {
  const [todos, dispatch] = useReducer(todosReducer as any, []) as any
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    api
      .getTodos()
      .then(aTodos => {
        dispatch({ type: ACTIONS.set, todos: aTodos })
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error getting todos', error)
        setIsLoading(false)
      })
  }, [dispatch])

  const customDispatch = useCallback(
    async (action: any) => {
      switch (action.type) {
        case ACTIONS.startAdd: {
          try {
            setIsLoading(true)
            const aTodos = await api.addTodo({ title: action.title })
            dispatch({ type: ACTIONS.set, todos: aTodos })
            setIsLoading(false)
          } catch (error) {
            console.error('Error adding todo', error, action)
            setIsLoading(false)
          }
          break
        }
        case ACTIONS.startDelete: {
          try {
            setIsLoading(true)
            const aTodos = await api.deleteTodo(action.todo)
            dispatch({ type: ACTIONS.set, todos: aTodos })
            setIsLoading(false)
          } catch (error) {
            console.error('Error deleting todo', error, action)
            setIsLoading(false)
          }
          break
        }
        case ACTIONS.startToggle: {
          try {
            setIsLoading(true)
            const aTodos = await api.toggleTodo(action.todo)
            dispatch({ type: ACTIONS.set, todos: aTodos })
            setIsLoading(false)
          } catch (error) {
            console.error('Error toggling todo', error, action)
            setIsLoading(false)
          }
          break
        }
        default:
          // Not a special case, dispatch the action
          dispatch(action)
      }
    },
    [dispatch]
  )

  return [todos, customDispatch, isLoading]
}

const WithAsyncReducer = () => {
  const [todos, dispatch, isLoading] = useAsyncTodos()

  return (
    <div data-testid={TEST_ID.container}>
      <h4>With Async Reducer</h4>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <TodoList todos={todos} dispatch={dispatch} />}
    </div>
  )
}

export default WithAsyncReducer
