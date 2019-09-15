import { useReducer, useEffect, useCallback, useState } from 'react'
import useIsMounted from '../../../hooks/useIsMounted'
import todosReducer, { ACTION as REDUCER_ACTION } from '../reducers/todos'
import api from '../../../api/todosService'

export const ACTION = {
  ...REDUCER_ACTION,
  startAdd: 'startAdd',
  startDelete: 'startDelete',
  startToggle: 'startToggle'
}

const useAsyncTodos = (appId: string) => {
  const [todos, dispatchU] = useReducer(todosReducer as any, []) as any
  const [isLoading, setIsLoadingU] = useState(false)

  const { useSafe } = useIsMounted()
  const dispatch = useSafe(dispatchU)
  const setIsLoading = useSafe(setIsLoadingU)

  useEffect(() => {
    setIsLoading(true)
    api
      .getTodos(appId)
      .then(aTodos => {
        dispatch({ type: ACTION.set, todos: aTodos })
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error getting todos', error)
        setIsLoading(false)
      })
  }, [appId, dispatch, setIsLoading])

  const customDispatch = useCallback(
    async (action: any) => {
      switch (action.type) {
        case ACTION.startAdd: {
          try {
            setIsLoading(true)
            const aTodos = await api.addTodo(appId, { title: action.title })
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
            const aTodos = await api.deleteTodo(appId, action.todo)
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
            const aTodos = await api.toggleTodo(appId, action.todo)
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
    [appId, dispatch, setIsLoading]
  )

  return { todos, dispatch: customDispatch, isLoading }
}

export default useAsyncTodos
