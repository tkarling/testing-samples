import { useEffect, useState } from 'react'
import useIsMounted from '../../../hooks/useIsMounted'
import { api1 as api } from '../../../api/service'

const useCounter = () => {
  const [counter, setCounterU] = useState(5)
  const [loading, setLoadingU] = useState(false)

  const { useSafe } = useIsMounted()
  const setCounter = useSafe(setCounterU)
  const setLoading = useSafe(setLoadingU)

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
  }, [setCounter, setLoading])

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
