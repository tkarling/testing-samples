import { useState, useEffect, useCallback } from 'react'

export interface Config {
  name: string
  base?: string
  path: string
  limit?: number
  query?: string
  initial: any
}

export const useFetch = ({
  base = 'https://pokeapi.co',
  path = '/api/v2/pokemon',
  query = '',
  initial = [] //
}: Config) => {
  const [result, setResult] = useState(() => initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(base + path + query)
        const fetchedResult = await response.json()
        setResult(fetchedResult)
      } catch (error) {
        console.error('error fetching', error)
        setError(error.message)
        setResult(() => initial)
      }
      setLoading(false)
    }
    if (!loading && result === initial) {
      fetchResult()
    }
  }, [base, initial, query, path, loading, result])

  return [result, { loading, error }]
}

export const useCumulativeFetch = ({
  base = 'https://pokeapi.co',
  path = '/api/v2/pokemon',
  limit = 5,
  initial = []
}: Config) => {
  const [items, setItems] = useState(() => initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [offset, setOffset] = useState(0)

  const nextItems = useCallback(() => {
    const fetchResult = async () => {
      setLoading(true)
      setError('')
      try {
        const query = `?limit=${limit}&offset=${offset}`
        const response = await fetch(base + path + query)
        const fetchedResult: { results: any[] } = await response.json()
        if (
          fetchedResult &&
          fetchedResult.results &&
          fetchedResult.results.length
        ) {
          setItems((prev: any) => [...prev, ...fetchedResult.results])
          setOffset(prev => prev + limit)
        } else {
          console.log('no items for', base + path + query)
        }
      } catch (error) {
        console.error('error fetching', error)
        setError(error.message)
      }
      setLoading(false)
    }
    if (!loading) {
      fetchResult()
    }
  }, [loading, limit, offset, base, path])
  return [items, { nextItems }, { loading, error }]
}
