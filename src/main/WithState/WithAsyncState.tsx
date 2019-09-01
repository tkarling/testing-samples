import React from 'react'

import useCounter from './hooks/useCounter'
import Counter from './components/Counter'

const WithAsyncState = () => {
  const { counter, increment } = useCounter()

  return (
    <Counter title="Async Counter" counter={counter} increment={increment} />
  )
}

export default WithAsyncState
