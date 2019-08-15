import React, { useContext } from 'react'
import { Value, useValue } from './Common'

const WithAsyncConsumer = () => {
  const value = useContext(ValueContext)
  const { increment } = useContext(ActionContext)
  return (
    <Value title="Context Async Value" value={value} increment={increment} />
  )
}

const ValueContext = React.createContext(0)
const ActionContext = React.createContext({ increment: () => {} })

const WithAsyncProvider = () => {
  const { value, increment } = useValue()

  return (
    <ActionContext.Provider value={{ increment }}>
      <ValueContext.Provider value={value}>
        <WithAsyncConsumer />
      </ValueContext.Provider>
    </ActionContext.Provider>
  )
}

export default WithAsyncProvider
