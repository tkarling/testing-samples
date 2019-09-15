import React from 'react'

const Counter = ({
  counter,
  increment,
  title,
  loading,
  id = 'counter'
}: {
  counter: number
  increment: any
  title: string
  loading: boolean
  id?: string
}) =>
  !loading ? (
    <div onClick={increment} id={id} data-testid={id}>
      {title}: {counter}
    </div>
  ) : (
    <div data-testid="loading">Spinning...</div>
  )

export default Counter
