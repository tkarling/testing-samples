import { useReducer, useEffect, useCallback, useState } from 'react'
import useIsMounted from '../../../hooks/useIsMounted'
import todosReducer, { ACTION as REDUCER_ACTION } from '../reducers/todos'
import { api1, api2, serviceApi } from '../../../api/service'

export const ACTION = {
  ...REDUCER_ACTION,
  startAdd: 'startAdd',
  startDelete: 'startDelete',
  startToggle: 'startToggle'
}

const useAsyncTodos = (api: serviceApi) => {
  const [todos, dispatchU] = useReducer(todosReducer as any, []) as any
  const [isLoading, setIsLoadingU] = useState(false)

  const { useSafe } = useIsMounted()
  const dispatch = useSafe(dispatchU)
  const setIsLoading = useSafe(setIsLoadingU)

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
  }, [api, dispatch, setIsLoading])

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
    [api, dispatch, setIsLoading]
  )

  return { todos, dispatch: customDispatch, isLoading }
}

export const useAsyncTodos1 = () => useAsyncTodos(api1)
export const useAsyncTodos2 = () => useAsyncTodos(api2)
