import React, { useState } from 'react'

export const INITIAL_VALUE = 2
const WithState = () => {
  const [value, setValue] = useState(INITIAL_VALUE)

  const increment = () => setValue(value => value + 1)
  return (
    <div onClick={increment} id="value" data-test-id="value">
      Value: {value}
    </div>
  )
}

export default WithState
