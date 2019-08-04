import React, { useState, useEffect } from 'react'
import { getValue } from '../api/service'

const WithState = () => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    getValue().then(updatedValue => setValue(updatedValue))
  }, [])

  const increment = () => setValue(value => value + 1)
  return value ? (
    <div onClick={increment} id="value" data-testid="value">
      Async Value: {value}
    </div>
  ) : (
    <div data-testid="loading">Loading...</div>
  )
}

export default WithState
