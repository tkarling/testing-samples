import React, { useEffect, useState } from 'react'
import { getCounter } from '../../api/service'

export const useCounter = () => {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    getCounter()
      .then(updatedCounter => setCounter(updatedCounter))
      .catch(error => console.error('Error in useCounter', error))
  }, [])

  const increment = () => setCounter(counter => counter + 1)
  return { counter, increment }
}

export const Counter = ({
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
