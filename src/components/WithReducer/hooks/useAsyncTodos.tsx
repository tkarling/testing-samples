import React, { useReducer, useEffect, useCallback, useState } from 'react'
import todosReducer, { ACTION as REDUCER_ACTION } from '../reducers/todos'
import * as api from '../../../api/service'

export const ACTION = {
  ...REDUCER_ACTION,
  startAdd: 'startAdd',
  startDelete: 'startDelete',
  startToggle: 'startToggle'
}

const useAsyncTodos = () => {
  const [todos, dispatch] = useReducer(todosReducer as any, []) as any
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    api
      .getTodos()
      .then(aTodos => {
        dispatch({ type: ACTION.set, todos: aTodos })
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
        case ACTION.startAdd: {
          try {
            setIsLoading(true)
            const aTodos = await api.addTodo({ title: action.title })
            dispatch({ type: ACTION.set, todos: aTodos })
            setIsLoading(false)
          } catch (error) {
            console.error('Error adding todo', error, action)
            setIsLoading(false)
          }
          break
        }
        case ACTION.startDelete: {
          try {
            setIsLoading(true)
            const aTodos = await api.deleteTodo(action.todo)
            dispatch({ type: ACTION.set, todos: aTodos })
            setIsLoading(false)
          } catch (error) {
            console.error('Error deleting todo', error, action)
            setIsLoading(false)
          }
          break
        }
        case ACTION.startToggle: {
          try {
            setIsLoading(true)
            const aTodos = await api.toggleTodo(action.todo)
            dispatch({ type: ACTION.set, todos: aTodos })
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

  return { todos, dispatch: customDispatch, isLoading }
}

export default useAsyncTodos
