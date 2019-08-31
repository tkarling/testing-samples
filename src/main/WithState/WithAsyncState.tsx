import React from 'react'
import { Counter, useCounter } from './Common'

const WithAsyncState = () => {
  const { counter, increment } = useCounter()

  return (
    <Counter title="Async Counter" counter={counter} increment={increment} />
  )
}

export default WithAsyncState
