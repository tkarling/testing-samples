import React from 'react'

import { CounterContext, ActionContext } from './WithContextContext'
import useCounter from './hooks/useCounter'
import WithAsyncConsumer from './WithContextAsyncStateConsumer'

const WithAsyncProvider = () => {
  const { counter, increment, loading } = useCounter('WithAsyncProvider')

  return (
    <div data-testid="container">
      <ActionContext.Provider value={{ increment }}>
        <CounterContext.Provider value={{ counter, loading }}>
          <WithAsyncConsumer />
        </CounterContext.Provider>
      </ActionContext.Provider>
    </div>
  )
}

export default WithAsyncProvider
