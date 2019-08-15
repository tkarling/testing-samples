import React, { useEffect, useState } from 'react'
import { getValue } from '../../api/service'

export const useValue = () => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    getValue()
      .then(updatedValue => setValue(updatedValue))
      .catch(error => console.error('Error in useValue', error))
  }, [])

  const increment = () => setValue(value => value + 1)
  return { value, increment }
}

export const Value = ({
  value,
  increment,
  title
}: {
  value: number
  increment: any
  title: string
}) =>
  value ? (
    <div onClick={increment} id="value" data-testid="value">
      {title}: {value}
    </div>
  ) : (
    <div data-testid="loading">Loading...</div>
  )
