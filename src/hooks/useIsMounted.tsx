import { useRef, useEffect, useCallback } from 'react'

const useIsMounted = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const useSafe = (fn: any) =>
    useCallback((...props) => (mountedRef.current ? fn(...props) : () => {}), [
      fn
    ])
  return { useSafe }
}

export default useIsMounted
