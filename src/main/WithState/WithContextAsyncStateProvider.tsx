import React from 'react'

import { CounterContext, ActionContext } from './WithContextContext'
import useCounter from './hooks/useCounter'
import WithAsyncConsumer from './WithContextAsyncStateConsumer'

const WithAsyncProvider = () => {
  const { counter, increment } = useCounter()

  return (
    <ActionContext.Provider value={{ increment }}>
      <CounterContext.Provider value={counter}>
        <WithAsyncConsumer />
      </CounterContext.Provider>
    </ActionContext.Provider>
  )
}

export default WithAsyncProvider
