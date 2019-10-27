import React, { useState, useEffect, useCallback } from 'react'

interface Config {
  name: string
  base?: string
  path: string
  limit?: number
  query?: string
  initial: any
}

const useFetch = ({
  base = 'https://pokeapi.co',
  path = '/api/v2/pokemon',
  query = '',
  initial = []
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

const useCumulativeFetch = ({
  base = 'https://pokeapi.co',
  path = '/api/v2/pokemon',
  limit = 5,
  initial = []
}: Config) => {
  const [result, setResult] = useState(() => initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [offset, setOffset] = useState(0)

  const next = useCallback(() => {
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
          setResult((prev: any) => [...prev, ...fetchedResult.results])
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
  return [result, { next }, { loading, error }]
}

const ShowFetched = ({ error, loading, children }: any) => {
  return (
    <div style={{ padding: 4 }}>
      {error && <div>Error Fetching {error}</div>}
      {!error && loading && <div>Loading...</div>}
      {!error && !loading && children}
    </div>
  )
}

const Title = ({ children }: { children: string }) => (
  <span style={{ fontWeight: 'bold' }}>{children}: </span>
)

const ShowList = ({ config }: { config: Config }) => {
  const [result, { loading, error }] = useFetch(config)
  const items = (result && (result as any).results) || config.initial

  return (
    <ShowFetched error={error} loading={loading}>
      <div>
        <Title>{config.name}</Title>{' '}
        {items.map((pokemon: any) => pokemon.name + ', ')}
      </div>
    </ShowFetched>
  )
}

const ShowCumulativeList = ({ config }: { config: Config }) => {
  const [items, { next }, { loading, error }] = useCumulativeFetch(config)

  return (
    <ShowFetched error={error} loading={loading}>
      <div>
        <button onClick={() => next()} style={{ marginRight: 8 }}>
          next
        </button>
        <span>
          <Title>{config.name}</Title>{' '}
          {items.map((pokemon: any) => pokemon.name + ', ')}
        </span>
      </div>
    </ShowFetched>
  )
}

const ShowItem = ({ config }: { config: Config }) => {
  const [result, { loading, error }] = useFetch(config)
  return (
    <ShowFetched error={error} loading={loading}>
      {result && (
        <div>
          <Title>{config.name}</Title> id: {result.id}, name: {result.name}
        </div>
      )}
    </ShowFetched>
  )
}

const config15 = {
  name: 'List Pokemon 1-5',
  path: '/api/v2/pokemon',
  query: '/?limit=5&offset=5',
  initial: []
}
const configI15 = {
  name: 'List Items 1-5',
  path: '/api/v2/item',
  query: '/?limit=5&offset=5',
  initial: []
}
const configP1 = { name: 'Pokemon 1', path: '/api/v2/pokemon/1', initial: null }
const Experiment1 = () => {
  return (
    <div>
      <ShowList config={config15} />
      <ShowList config={configI15} />
      <ShowItem config={configP1} />
    </div>
  )
}

const configCont = {
  name: 'List Pokemon 1-5',
  path: '/api/v2/pokemon',
  query: '/?limit=5&offset=5',
  initial: []
}
const Experiment = () => {
  return (
    <div>
      <Experiment1 />
      <ShowCumulativeList config={configCont} />
    </div>
  )
}

export default Experiment
