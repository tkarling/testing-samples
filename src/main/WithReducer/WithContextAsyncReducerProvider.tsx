import React from 'react'
import useAsyncTodos from './hooks/useAsyncTodos'
import { TEST_ID } from './components/Common'

import { TodosContext, ActionContext } from './WithContextAsyncReducerContext'
import TodoList from './WithContextAsyncReducerConsumer'

const WithContextAsyncReducer = () => {
  const { todos, isLoading, dispatch } = useAsyncTodos(
    'WithContextAsyncReducer'
  )

  return (
    <ActionContext.Provider value={{ dispatch }}>
      <TodosContext.Provider value={{ todos, isLoading }}>
        <div data-testid={TEST_ID.container}>
          <h4>With Context Async Reducer</h4>
          {isLoading && <div>Spinning...</div>}
          {!isLoading && <TodoList />}
        </div>
      </TodosContext.Provider>
    </ActionContext.Provider>
  )
}

export default WithContextAsyncReducer
