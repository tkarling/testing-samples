import React, { useContext } from 'react'
import Counter from './components/Counter'
import { CounterContext, ActionContext } from './WithContextContext'

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

export default WithAsyncConsumer
