import { useEffect, useState } from 'react'
import { api1 as api } from '../../../api/service'

const useCounter = () => {
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    api
      .getCounter()
      .then(loadedCounter => {
        setCounter(loadedCounter)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error getting counter', error)
        setLoading(false)
      })
  }, [])

  const increment = () => {
    setLoading(true)
    api
      .setCounter(counter + 1)
      .then(lCounter => {
        setCounter(lCounter)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error saving counter', error)
        setLoading(false)
      })
  }

  return { counter, increment, loading }
}

export default useCounter
