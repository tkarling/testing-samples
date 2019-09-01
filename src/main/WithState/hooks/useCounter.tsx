import { useEffect, useState } from 'react'
import { api1 as api } from '../../../api/service'

const useCounter = () => {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    api
      .getCounter()
      .then(updatedCounter => setCounter(updatedCounter))
      .catch(error => console.error('Error in useCounter', error))
  }, [])

  const increment = () => setCounter(counter => counter + 1)
  return { counter, increment }
}

export default useCounter
