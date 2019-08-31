import React, { useContext } from 'react'
import { Counter, useCounter } from './Common'

const WithAsyncConsumer = () => {
  const counter = useContext(CounterContext)
  const { increment } = useContext(ActionContext)
  return (
    <Counter
      title="Context Async Counter"
      counter={counter}
      increment={increment}
    />
  )
}

const noop = () => {}
const CounterContext = React.createContext(0)
const ActionContext = React.createContext({ increment: noop })

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
