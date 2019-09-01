import React from 'react'

const Counter = ({
  counter,
  increment,
  title,
  loading
}: {
  counter: number
  increment: any
  title: string
  loading: boolean
}) =>
  !loading ? (
    <div onClick={increment} id="counter" data-testid="counter">
      {title}: {counter}
    </div>
  ) : (
    <div data-testid="loading">Spinning...</div>
  )

export default Counter
