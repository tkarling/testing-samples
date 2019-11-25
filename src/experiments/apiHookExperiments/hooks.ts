import { useState, useEffect, useCallback } from 'react'
import { any } from 'prop-types'

export interface Config {
  name: string
  base?: string
  path: string
  limit?: number
  query?: string
  initial?: any
}

const fetchMyResult = async ({
  base = 'https://pokeapi.co',
  path,
  limit = 5,
  offset = 0,
  initial = [],
  actions: { setLoading, setError }
}: {
  base?: string
  path: string
  limit?: number
  offset?: number
  initial?: any
  actions: { setLoading: any; setError: any }
}) => {
  let result = initial
  setLoading(true)
  setError('')
  try {
    const query = `?limit=${limit}&offset=${offset}`
    const response = await fetch(base + path + query)
    result = await response.json()
  } catch (error) {
    console.error('error fetching', error)
    setError(error.message)
  }
  setLoading(false)
  return result
}

export const useFetch = ({
  base,
  path = '/api/v2/pokemon',
  initial
}: Config) => {
  const [result, setResult] = useState(() => initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResult = async () => {
      const fetchedResult = await fetchMyResult({
        base,
        path,
        initial,
        actions: { setLoading, setError }
      })
      setResult(fetchedResult)
    }
    if (!loading && result === initial) {
      fetchResult()
    }
  }, [base, initial, path, loading, result])

  return [result, { loading, error }]
}

export const useCumulativeFetch = ({
  base,
  path = '/api/v2/pokemon',
  limit = 5,
  initial
}: Config) => {
  const [items, setItems] = useState(() => initial || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [offset, setOffset] = useState(0)

  const nextItems = useCallback(() => {
    const fetchResult = async () => {
      const fetchedResult = await fetchMyResult({
        base,
        path,
        limit,
        offset,
        initial,
        actions: { setLoading, setError }
      })
      if (
        fetchedResult &&
        fetchedResult.results &&
        fetchedResult.results.length
      ) {
        setItems((prev: any) => [...prev, ...fetchedResult.results])
        setOffset(prev => prev + limit)
      }
    }
    if (!loading) {
      fetchResult()
    }
  }, [loading, limit, offset, base, path])
  return [items, { nextItems }, { loading, error }]
}
