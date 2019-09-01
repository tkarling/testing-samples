import React from 'react'

const Counter = ({
  counter,
  increment,
  title
}: {
  counter: number
  increment: any
  title: string
}) =>
  counter ? (
    <div onClick={increment} id="counter" data-testid="counter">
      {title}: {counter}
    </div>
  ) : (
    <div data-testid="loading">Loading...</div>
  )

export default Counter
