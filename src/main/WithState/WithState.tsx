import React, { useState } from 'react'

export const INITIAL_COUNTER = 2
const WithState = () => {
  const [counter, setCounter] = useState(INITIAL_COUNTER)

  const increment = () => setCounter(counter => counter + 1)
  return (
    <div onClick={increment} id="counter" data-testid="counter">
      Counter: {counter}
    </div>
  )
}

export default WithState
