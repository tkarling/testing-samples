import React from 'react'
import { useFetch, useCumulativeFetch, Config } from './hooks'

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
  const [result, { loading = false, error = '' }] = useFetch(config)
  const items = (result && (result as any).results) || config.initial || []

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
  const [items = [], { nextItems }, { loading, error }] = useCumulativeFetch(
    config
  )

  return (
    <ShowFetched error={error} loading={loading}>
      <div>
        <button onClick={nextItems} style={{ marginRight: 8 }}>
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

const configPokemons15 = {
  name: 'List Pokemon 1-5',
  path: '/api/v2/pokemon'
}
const configItems15 = {
  name: 'List Items 1-5',
  path: '/api/v2/item'
}
const configPokemon1 = {
  name: 'Pokemon 1',
  path: '/api/v2/pokemon/1',
  initial: null
}
const configPokemons5AtTime = {
  name: 'List Pokemons 5 more at time',
  path: '/api/v2/pokemon'
}
const Experiment = () => {
  return (
    <div>
      <ShowList config={configPokemons15} />
      <ShowList config={configItems15} />
      <ShowItem config={configPokemon1} />
      <ShowCumulativeList config={configPokemons5AtTime} />
    </div>
  )
}

export default Experiment
