import React from 'react'
import { Value, useValue } from './Common'

const WithAsyncState = () => {
  const { value, increment } = useValue()

  return <Value title="Async Value" value={value} increment={increment} />
}

export default WithAsyncState
