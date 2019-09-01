import React from 'react'

import useCounter from './hooks/useCounter'
import Counter from './components/Counter'

const WithAsyncState = () => {
  const { counter, increment, loading } = useCounter()

  return (
    <div data-testid="container">
      <Counter
        title="Async Counter"
        counter={counter}
        increment={increment}
        loading={loading}
      />
    </div>
  )
}

export default WithAsyncState
