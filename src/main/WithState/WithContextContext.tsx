import React from 'react'

const noop = () => {}
export const CounterContext = React.createContext({
  counter: 0,
  loading: false
})
export const ActionContext = React.createContext({ increment: noop })
